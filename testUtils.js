import { render } from '@testing-library/react';
import theme from './theme';
import { ThemeProvider } from 'styled-components';

function WithProviders({ children }) {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}

function customRender(ui, options) {
    return render(ui, { wrapper: WithProviders, ...options });
}

export * from '@testing-library/react';

export { customRender as render };