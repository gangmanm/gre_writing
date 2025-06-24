import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { themeState, lightTheme, darkTheme } from '../state/themeState';
import * as S from './styles/documentation.style';
import type { ComponentProps } from 'react';
import type { Components } from 'react-markdown';
import { InfoBox } from '../components/markdown';
import { JsonList } from '../components/JsonList';
import LinkBlock from '../components/markdown/LinkBlock';
import { Essay } from '../components/Essay';
import { FaBars, FaList } from 'react-icons/fa';
import styled from '@emotion/styled';

interface DocSection {
  id: string;
  title: string;
  path: string;
  subsections?: (DocSection & {
    subsections?: DocSection[];
  })[];
}

const docSections: DocSection[] = [
  {
    id: 'GRE 라이팅 이란',
    title: 'GRE 라이팅 개요',
    path: '/introduction.md'
  },
  {
    id: 'issue-task',
    title: 'Issue Task',
    path: '/issue-task.md',
    subsections: [
      {
        id: 'task1',
        title: 'Task1',
        path: '/issue/task1.md'
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

const processMarkdown = (text: string): string => {
  // Process @link tags
  let processed = text.replace(/@link\[{(.+?)}\]/g, (match, jsonStr) => {
    try {
      const data = JSON.parse(`{${jsonStr}}`);
      return `<div class="link-block-wrapper" data-link='${JSON.stringify(data)}'></div>`;
    } catch (e) {
      console.error('Failed to parse link JSON:', e);
      return match;
    }
  });

  // Process @info, @warning, @tip, @essay tags
  processed = processed.replace(/@(info|warning|tip|essay)\[(.*?)\]([\s\S]*?)@end/g, (_, type, title, content) => {
    if (type === 'essay') {
      try {
        const data = JSON.parse(title);
        return `<div class="info-essay" data-task="${data.taskNumber}" data-topic="${data.topic}">${content.trim()}</div>`;
      } catch (e) {
        console.error('Failed to parse essay data:', e);
        return _;
      }
    }
    return `<div class="info-${type} ${title}">${content.trim()}</div>`;
  });

  return processed; 
};

export const DocLayout = styled.div<{ theme: any }>`
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr);
  background-color: ${(props: { theme: any }) => props.theme.background};
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    top: 50px;
  }
`;

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
      const baseUrl = import.meta.env.VITE_BASE_URL || '/';
      const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
      const docPath = `${normalizedBase}docs/${normalizedPath}`;
      
      console.log('Loading document from:', docPath);
      const response = await fetch(docPath);
      if (!response.ok) {
        throw new Error(`Failed to load documentation: ${response.status}`);
      }
      const text = await response.text();
      setMarkdown(processMarkdown(text));
    } catch (error) {
      console.error('Error loading documentation:', error);
      setMarkdown('# Error\nFailed to load documentation. Please try again later.');
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
            {((section.subsections && section.subsections.length > 0) || 
              (section.subsections?.some(sub => sub.subsections && sub.subsections.length > 0))) && (
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
    p: ({ children, ...props }) => {
      if (typeof children === 'string') {
        // Check for @list pattern
        if (children.startsWith('@list[')) {
          try {
            const jsonStr = children.slice(children.indexOf('[') + 1, children.lastIndexOf(']'));
            const data = JSON.parse(jsonStr);
            return <JsonList {...data} />;
          } catch (e) {
            console.error('Failed to parse JSON list:', e);
            return <p {...props}>{children}</p>;
          }
        }
        
        // Check for @link pattern
        if (children.includes('@link[')) {
          try {
            const linkRegex = /@link\[{(.+?)}\]/;
            const match = children.match(linkRegex);
            if (match) {
              const jsonStr = match[1];
              const data = JSON.parse(`{${jsonStr}}`);
              return <LinkBlock {...data} theme={theme} />;
            }
          } catch (e) {
            console.error('Failed to parse JSON link:', e);
          }
        }

        // Check for info box pattern
        const infoMatch = /@(info|warning|tip)\[(.*?)\]([\s\S]*?)@end/.exec(children);
        if (infoMatch) {
          const [_, type, title, content] = infoMatch;
          return (
            <InfoBox type={type as 'info' | 'warning' | 'tip' | 'essay'} title={title}>
              {content.trim()}
            </InfoBox>
          );
        }
      }
      return <p {...props}>{children}</p>;
    },
    div: ({ className, children, ...props }: { className?: string; children?: React.ReactNode; [key: string]: any }) => {
      if (className === 'link-block-wrapper' && props['data-link']) {
        try {
          const data = JSON.parse(props['data-link']);
          return <LinkBlock {...data} theme={theme} />;
        } catch (e) {
          console.error('Failed to parse link data:', e);
          return null;
        }
      }
      if (className === 'info-essay') {
        return (
          <InfoBox type="essay" title={`Essay Task ${props['data-task']}`}>
            <p><strong>Topic:</strong> {props['data-topic']}</p>
            {children}
          </InfoBox>
        );
      }
      const match = /^info-(info|warning|tip)\s*(.*)$/.exec(className || '');
      if (match) {
        const [, type, title] = match;
        return (
          <InfoBox type={type as 'info' | 'warning' | 'tip'} title={title.trim()}>
            {children}
          </InfoBox>
        );
      }
      return <div className={className} {...props}>{children}</div>;
    },
    a: ({ href, children, ...props }) => {
      if (props.className === 'styled-link') {
        return <a {...props} href={href}>{children}</a>;
      }
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="styled-link"
        >
          {children}
        </a>
      );
    },
  };

  if (!markdown) {
    return <S.LoadingMessage theme={theme}>Loading documentation...</S.LoadingMessage>;
  }

  return (
    <>
      <DocLayout theme={theme}>
        <S.Sidebar theme={theme}>
          <S.NavList>
            {renderNavItems(docSections)}
          </S.NavList>
        </S.Sidebar>
        <S.DocContainer theme={theme}>
          <S.DocContent 
            theme={theme} 
            className="doc-content"
            style={{
              paddingLeft: (() => {
                return '1.5rem';
              })()
            }}
          >
            <div>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={components}
              >
                {markdown}
              </ReactMarkdown>
            </div>
          </S.DocContent>
        </S.DocContainer>
      </DocLayout>

      {/* Mobile Navigation */}
      <S.MobileNav theme={theme}>
        <S.MobileNavButton 
          theme={theme}
          onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        >
          <FaBars />
          <span>Menu</span>
        </S.MobileNavButton>
      </S.MobileNav>

      {/* Mobile Overlay */}
      <S.MobileOverlay 
        isOpen={isMobileSidebarOpen} 
        onClick={() => setIsMobileSidebarOpen(false)}
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
    </>
  );
}; 