import { render } from '@testing-library/vue';
import { beforeEach, describe, expect, vi } from "vitest";
import userEvent from '@testing-library/user-event';

import Search from './search.vue';
import { useUIStore } from '@/stores/ui';

import { createPinia, setActivePinia } from 'pinia';
import { i18n } from '@/plugins/i18n';

vi.mock('@/api/tvmaze/search', () => ({
  getShowsByTerm: vi.fn((query) => [])
}));

const pinia = createPinia();

setActivePinia(pinia);

describe('Search', () => {
  it('Returns a valid search request', async() => {
    const store = useUIStore();

    const screen = await render(Search, {
      global: {
        plugins: [
          pinia,
          i18n,
        ],
      },
    });

    const inputField = screen.getByTestId('q');
    // set value
    await userEvent.type(inputField, 'Rookie');

    const submitButton = screen.getByRole('button');

    await expect(inputField).toBeVisible();
    await expect(submitButton).toBeVisible();

    await submitButton.click();
    expect(store.hasValidSearchTerm).toBeTruthy();
    expect(store.searchTerm).toBe('rookie');
  });

  it('Trims the search term', async() => {
    const store = useUIStore();

    const screen = await render(Search, {
      global: {
        plugins: [
          pinia,
          i18n,
        ],
      },
    });

    const inputField = screen.getByTestId('q');
    // set html injection
    await userEvent.clear(inputField);
    await userEvent.type(inputField, '   rookie   ');

    const submitButton = screen.getByRole('button');
    await submitButton.click();

    expect(store.searchTerm).toBe('rookie');
  });

  it('Ignores the HTML injection', async() => {
    const store = useUIStore();

    const screen = await render(Search, {
      global: {
        plugins: [
          pinia,
          i18n,
        ],
      },
    });

    const inputField = screen.getByTestId('q');
    // set html injection
    await userEvent.clear(inputField);
    await userEvent.type(inputField, '<script>alert(1)</script>');

    const submitButton = screen.getByRole('button');
    await submitButton.click();

    expect(store.searchTerm).not.toContain('<script>');
  });
});