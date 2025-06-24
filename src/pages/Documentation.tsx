import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import remarkInfoBox from '../utils/remarkInfoBox';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { themeState, lightTheme, darkTheme } from '../state/themeState';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import * as S from './styles/documentation.style';
import type { ComponentProps } from 'react';
import type { Components } from 'react-markdown';
import { InfoBox } from '../components/markdown';
import { FaBars, FaList } from 'react-icons/fa';

interface DocSection {
  id: string;
  title: string;
  path: string;
  subsections?: DocSection[];
}

const docSections: DocSection[] = [
  {
    id: 'introduction',
    title: 'Introduction',
    path: '/introduction.md',
    subsections: [
      {
        id: 'overview',
        title: 'Overview',
        path: '/overview.md'
      },
      {
        id: 'getting-started',
        title: 'Getting Started',
        path: '/getting-started.md'
      }
    ]
  },
  {
    id: 'issue-task',
    title: 'Issue Task',
    path: '/issue-task.md',
    subsections: [
      {
        id: 'issue-strategies',
        title: 'Writing Strategies',
        path: '/issue-strategies.md'
      },
      {
        id: 'issue-examples',
        title: 'Sample Essays',
        path: '/issue-examples.md'
      }
    ]
  },
  {
    id: 'argument-task',
    title: 'Argument Task',
    path: '/argument-task.md',
    subsections: [
      {
        id: 'argument-analysis',
        title: 'Analysis Techniques',
        path: '/argument-analysis.md'
      },
      {
        id: 'argument-examples',
        title: 'Sample Essays',
        path: '/argument-examples.md'
      }
    ]
  }
];

interface TocItem {
  id: string;
  text: string;
  level: number;
}

const extractHeaders = (markdown: string): TocItem[] => {
  const headerRegex = /^(#{1,3})\s+(.+)$/gm;
  const headers: TocItem[] = [];
  let match;

  while ((match = headerRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    headers.push({ id, text, level });
  }

  return headers;
};

const scrollToHeader = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const container = document.querySelector('.doc-content');
    if (container) {
      const elementTop = element.offsetTop;
      const containerTop = container.scrollTop;
      const targetScroll = elementTop - 80; // 헤더 높이만큼 오프셋

      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }
};

const createHeadingComponent = (
  Component: typeof S.MarkdownHeading1 | typeof S.MarkdownHeading2 | typeof S.MarkdownHeading3,
  theme: any
) => {
  return ({ children, ...props }: ComponentProps<'h1' | 'h2' | 'h3'>) => {
    const id = typeof children === 'string' ? children.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
    return (
      <Component id={id} theme={theme} {...props}>
        {children}
      </Component>
    );
  };
};

export const Documentation = () => {
  const [themeMode, setThemeMode] = useRecoilState(themeState);
  const [markdown, setMarkdown] = useState('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['introduction']));
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.pathname.split('/').filter(Boolean);
  const currentPath = params[0] || 'introduction';
  const [activeHeader, setActiveHeader] = useState<string>('');
  const [headers, setHeaders] = useState<TocItem[]>([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobileTocOpen, setIsMobileTocOpen] = useState(false);

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  useEffect(() => {
    // Add overflow hidden to body when component mounts
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to restore overflow when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const findParentSection = (path: string) => {
      for (const section of docSections) {
        if (section.id === path) {
          return section.id;
        }
        if (section.subsections?.some(sub => sub.id === path)) {
          return section.id;
        }
      }
      return null;
    };

    const parentSection = findParentSection(currentPath);
    if (parentSection) {
      setExpandedSections(prev => new Set([...prev, parentSection]));
    }
  }, [currentPath]);

  const loadDocument = async (path: string) => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}docs${path}`);
      if (!response.ok) {
        throw new Error(`Failed to load documentation: ${response.status}`);
      }
      const text = await response.text();
      setMarkdown(text);
    } catch (error) {
      console.error('Error loading documentation:', error);
      setMarkdown('# Error\nFailed to load documentation.');
    }
  };

  useEffect(() => {
    const findDocPath = (path: string): string => {
      // First check main sections
      for (const section of docSections) {
        if (section.id === path) {
          return section.path;
        }
        // Then check subsections
        if (section.subsections) {
          for (const subsection of section.subsections) {
            if (subsection.id === path) {
              return subsection.path;
            }
          }
        }
      }
      // If no match found, redirect to introduction
      if (path !== 'introduction') {
        navigate('/introduction');
        return '/introduction.md';
      }
      return '/introduction.md';
    };

    const docPath = findDocPath(currentPath);
    loadDocument(docPath);
  }, [currentPath, navigate]);

  useEffect(() => {
    if (!markdown) return;

    const setupHeaders = () => {
      const newHeaders = extractHeaders(markdown);
      setHeaders(newHeaders);

      const observer = new IntersectionObserver(
        (entries) => {
          // Find the most visible entry
          const visibleEntries = entries.filter(entry => entry.isIntersecting);
          if (visibleEntries.length > 0) {
            const mostVisible = visibleEntries.reduce((prev, current) => {
              return (current.intersectionRatio > prev.intersectionRatio) ? current : prev;
            });
            setActiveHeader(mostVisible.target.id);
          }
        },
        {
          rootMargin: '-80px 0px -80% 0px',
          threshold: [0, 0.25, 0.5, 0.75, 1]
        }
      );

      newHeaders.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });

      return () => observer.disconnect();
    };

    const timeoutId = setTimeout(setupHeaders, 100);
    return () => clearTimeout(timeoutId);
  }, [markdown]);

  const handleNavigation = (sectionId: string) => {
    navigate(`/${sectionId}`);
    // Close mobile menus after navigation
    setIsMobileSidebarOpen(false);
    setIsMobileTocOpen(false);
  };

  const toggleSection = (sectionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleTocClick = (id: string) => {
    scrollToHeader(id);
    setIsMobileTocOpen(false);
  };

  const renderNavItems = (sections: DocSection[], level: number = 0) => {
    return sections.map(section => (
      <React.Fragment key={section.id}>
        <S.NavItem
          active={currentPath === section.id}
          onClick={() => handleNavigation(section.id)}
          theme={theme}
          level={level}
        >
          <S.NavItemContainer>
            {section.subsections && section.subsections.length > 0 && (
              <S.ToggleButton
                isOpen={expandedSections.has(section.id)}
                onClick={(e) => toggleSection(section.id, e)}
              />
            )}
            <span>{section.title}</span>
          </S.NavItemContainer>
        </S.NavItem>
        {section.subsections && (
          <S.SubsectionContainer isOpen={expandedSections.has(section.id)}>
            {renderNavItems(section.subsections, level + 1)}
          </S.SubsectionContainer>
        )}
      </React.Fragment>
    ));
  };

  const components: Components = {
    h1: createHeadingComponent(S.MarkdownHeading1, theme),
    h2: createHeadingComponent(S.MarkdownHeading2, theme),
    h3: createHeadingComponent(S.MarkdownHeading3, theme),
    div: ({ className, children, ...props }) => {
      const match = /^info-(info|warning|tip)(?:\s+(.+))?$/.exec(className || '');
      if (match) {
        const [, type, title] = match;
        return (
          <InfoBox type={type as 'info' | 'warning' | 'tip'} title={title}>
            {children}
          </InfoBox>
        );
      }
      return <div {...props}>{children}</div>;
    }
  };

  if (!markdown) {
    return <S.LoadingMessage theme={theme}>Loading documentation...</S.LoadingMessage>;
  }

  return (
    <>
      <S.DocLayout theme={theme}>
        <S.Sidebar theme={theme}>
          <S.NavList>
            {renderNavItems(docSections)}
          </S.NavList>
        </S.Sidebar>
        <S.DocContainer theme={theme}>
          <S.DocContent theme={theme} className="doc-content">
            <div>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkInfoBox]}
                rehypePlugins={[rehypeRaw]}
                components={components}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </S.DocContent>
        </S.DocContainer>
        <S.TableOfContents theme={theme}>
          <h3>Table of Contents</h3>
          <ul>
            {headers.map(({ id, text, level }) => (
              <li key={id} className={`h${level}`}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTocClick(id);
                  }}
                  className={activeHeader === id ? 'active' : ''}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </S.TableOfContents>
      </S.DocLayout>

      {/* Mobile Navigation */}
      <S.MobileNav theme={theme}>
        <S.MobileNavButton 
          theme={theme}
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          <FaBars />
          <span>Menu</span>
        </S.MobileNavButton>
        <S.MobileNavButton 
          theme={theme}
          onClick={() => setIsMobileTocOpen(!isMobileTocOpen)}
        >
          <FaList />
          <span>Contents</span>
        </S.MobileNavButton>
      </S.MobileNav>

      {/* Mobile Overlay */}
      <S.MobileOverlay 
        isOpen={isMobileSidebarOpen || isMobileTocOpen} 
        onClick={() => {
          setIsMobileSidebarOpen(false);
          setIsMobileTocOpen(false);
        }}
      />

      {/* Mobile Sidebar */}
      <S.MobileSidebar theme={theme} isOpen={isMobileSidebarOpen}>
        <S.MobileNavHeader theme={theme}>
          <h3>Menu</h3>
          <S.MobileCloseButton theme={theme} onClick={() => setIsMobileSidebarOpen(false)}>
            ✕
          </S.MobileCloseButton>
        </S.MobileNavHeader>
        <S.NavList>
          {renderNavItems(docSections)}
        </S.NavList>
      </S.MobileSidebar>

      {/* Mobile Table of Contents */}
      <S.MobileToc theme={theme} isOpen={isMobileTocOpen}>
        <S.MobileNavHeader theme={theme}>
          <h3>Table of Contents</h3>
          <S.MobileCloseButton theme={theme} onClick={() => setIsMobileTocOpen(false)}>
            ✕
          </S.MobileCloseButton>
        </S.MobileNavHeader>
        <div style={{ padding: '1.5rem' }}>
          <ul>
            {headers.map(({ id, text, level }) => (
              <li key={id} className={`h${level}`}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleTocClick(id);
                  }}
                  className={activeHeader === id ? 'active' : ''}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </S.MobileToc>
    </>
  );
}; 