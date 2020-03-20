import * as styledComponents from 'styled-components';

import { Theme } from './theme';

type ThemedStyledComponentsModule = styledComponents.ThemedStyledComponentsModule<Theme>;

const {
  default: styled,
  css,
  ThemeProvider,
  useTheme,
} = styledComponents as ThemedStyledComponentsModule;

export { css, ThemeProvider, useTheme };
export default styled;
