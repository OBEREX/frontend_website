// src/services/dashboardService.ts

import httpClient from './httpClient';
import { API_CONFIG } from './apiConfig';

export interface DashboardOverview {
  total_scans_today: number;
  time_saved_today: string;
  cost_savings_today: string;
  accuracy_rate_today: string;
  scans_change: string;
  time_saved_change: string;
  cost_savings_change: string;
  accuracy_change: string;
  comparison_period: string;
}

export interface ScanActivityData {
  day: string;
  scans: number;
  accuracy: number;
}

export interface CategoryDistribution {
  name: string;
  value: number;
  color: string;
}

export interface SystemComponent {
  name: string;
  status: string;
  color: string;
  response_time_ms?: number;
}

export interface SystemStatus {
  status: string;
  color: string;
  last_sync: string;
  ai_assistant_status: string;
  components: SystemComponent[];
}

class DashboardService {
  /**
   * Get dashboard overview metrics (today's stats)
   */
  async getOverview(): Promise<{ success: boolean; data: DashboardOverview }> {
    try {
      const response = await httpClient.get('/api/v1/dashboard/overview/');
      return response;
    } catch (error) {
      console.error('Error fetching dashboard overview:', error);
      throw error;
    }
  }

  /**
   * Get scan activity chart data
   * @param period - Time period: '7d', '30d', or '90d'
   */
  async getScanActivity(period: '7d' | '30d' | '90d' = '7d'): Promise<{
    success: boolean;
    period: string;
    data: ScanActivityData[];
  }> {
    try {
      const response = await httpClient.get(
        `/api/v1/dashboard/scan-activity/?period=${period}`
      );
      return response;
    } catch (error) {
      console.error('Error fetching scan activity:', error);
      throw error;
    }
  }

  /**
   * Get category distribution for pie chart
   */
  async getCategoryDistribution(): Promise<{
    success: boolean;
    data: CategoryDistribution[];
  }> {
    try {
      const response = await httpClient.get('/api/v1/dashboard/category-distribution/');
      return response;
    } catch (error) {
      console.error('Error fetching category distribution:', error);
      throw error;
    }
  }

  /**
   * Get system health status
   */
  async getSystemStatus(): Promise<{ success: boolean } & SystemStatus> {
    try {
      const response = await httpClient.get('/api/v1/dashboard/system-status/');
      return response;
    } catch (error) {
      console.error('Error fetching system status:', error);
      throw error;
    }
  }
}

export const dashboardService = new DashboardService();
export default dashboardService;