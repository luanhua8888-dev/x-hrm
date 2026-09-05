import { fireEvent, render, screen } from '@testing-library/react';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it } from 'vitest';

import DashboardPage from './DashboardPage';

function renderDashboard() {
  return render(
    <MemoryRouter>
      <I18nProvider i18n={i18n}>
        <DashboardPage />
      </I18nProvider>
    </MemoryRouter>,
  );
}

describe('DashboardPage', () => {
  beforeEach(() => {
    i18n.load('vi', {});
    i18n.activate('vi');
  });

  it('renders dashboard labels from the active Lingui locale', () => {
    i18n.load('en', {
      'Tổng nhân sự': 'Total headcount',
    });
    i18n.activate('en');
    renderDashboard();

    expect(screen.getByText('Total headcount')).toBeInTheDocument();
    expect(screen.queryByText('Tổng nhân sự')).not.toBeInTheDocument();
  });

  it('renders filters, workforce status, leave approvals and alerts', () => {
    renderDashboard();

    expect(screen.getByRole('combobox', { name: 'Khoảng thời gian' })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Phòng ban' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tình hình hôm nay' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Yêu cầu nghỉ phép' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Trung tâm cảnh báo' })).toBeInTheDocument();
  });

  it('shows loading feedback when refreshing mock data', () => {
    renderDashboard();

    fireEvent.click(screen.getByRole('button', { name: 'Làm mới dữ liệu' }));

    expect(screen.getByTestId('dashboard-skeleton')).toBeInTheDocument();
  });

  it('updates a leave request when it is approved', () => {
    renderDashboard();

    fireEvent.click(screen.getByRole('button', { name: 'Duyệt đơn của Nguyễn Văn A' }));

    expect(screen.getByText('Đã duyệt')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Duyệt đơn của Nguyễn Văn A' }),
    ).not.toBeInTheDocument();
  });
});
