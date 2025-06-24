import { atom } from 'recoil';

export type ThemeMode = 'light' | 'dark';

export const themeState = atom<ThemeMode>({
  key: 'themeState',
  default: 'light'
});

export const lightTheme = {
  background: '#ffffff',
  text: '#2d3748',
  primary: '#0070f3',
  sidebar: '#f7fafc',
  border: '#e2e8f0',
  hover: '#f0f5fa',
  shadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
};

export const darkTheme = {
  background: '#1a202c',
  text: '#e2e8f0',
  primary: '#4299e1',
  sidebar: '#2d3748',
  border: '#4a5568',
  hover: '#2c3544',
  shadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
}; 