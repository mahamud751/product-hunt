import React, { useState } from 'react';
import { Search, Filter, MoreVertical, Shield, AlertTriangle, Ban, CheckCircle, XCircle, Clock, Activity } from 'lucide-react';
import { Line } from 'react-chartjs-2';

interface FraudAlert {
  id: string;
  userId: string;
  userName: string;
  email: string;
  type: 'Multiple Accounts' | 'Rapid Actions' | 'Point Farming' | 'Suspicious IP';
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  detectedAt: string;
  status: 'New' | 'Investigating' | 'Resolved';
  evidence: {
    type: string;
    value: string;
    timestamp: string;
  }[];
  ipAddresses: string[];
  previousFlags: number;
}

const mockFraudAlerts: FraudAlert[] = [
  {
    id: '1',
    userId: 'user_1',
    userName: 'John Doe',
    email: 'john@example.com',
    type: 'Rapid Actions',
    severity: 'High',
    description: 'Unusual number of upvotes in short time period',
    detectedAt: '2024-02-15T10:00:00Z',
    status: 'New',
    evidence: [
      {
        type: 'Action Rate',
        value: '45 actions/minute',
        timestamp: '2024-02-15T09:55:00Z'
      },
      {
        type: 'Normal Rate',
        value: '5 actions/minute',
        timestamp: '2024-02-15T09:50:00Z'
      }
    ],
    ipAddresses: ['192.168.1.1'],
    previousFlags: 2
  },
  {
    id: '2',
    userId: 'user_2',
    userName: 'Jane Smith',
    email: 'jane@example.com',
    type: 'Multiple Accounts',
    severity: 'Medium',
    description: 'Multiple accounts sharing same IP address',
    detectedAt: '2024-02-14T15:30:00Z',
    status: 'Investigating',
    evidence: [
      {
        type: 'Shared IP',
        value: '192.168.1.2',
        timestamp: '2024-02-14T15:25:00Z'
      }
    ],
    ipAddresses: ['192.168.1.2'],
    previousFlags: 1
  },
  {
    id: '3',
    userId: 'user_3',
    userName: 'Mike Johnson',
    email: 'mike@example.com',
    type: 'Point Farming',
    severity: 'Low',
    description: 'Suspicious pattern of point accumulation',
    detectedAt: '2024-02-13T09:15:00Z',
    status: 'Resolved',
    evidence: [
      {
        type: 'Point Pattern',
        value: 'Repeated small transactions',
        timestamp: '2024-02-13T09:10:00Z'
      }
    ],
    ipAddresses: ['192.168.1.3'],
    previousFlags: 0
  }
];

const fraudActivityData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Suspicious Activities',
      data: [15, 23, 18, 29, 32, 25, 18],
      borderColor: '#DC2626',
      tension: 0.4,
    },
    {
      label: 'Confirmed Fraud',
      data: [5, 8, 6, 12, 15, 10, 7],
      borderColor: '#991B1B',
      tension: 0.4,
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      type: 'linear' as const,
    }
  }
};

export default function FraudDetection({ dateFilter }: { dateFilter: string }) {
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'userName' | 'severity' | 'detectedAt'>('detectedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedAlerts(mockFraudAlerts.map(alert => alert.id));
    } else {
      setSelectedAlerts([]);
    }
  };

  const handleSelectAlert = (alertId: string) => {
    if (selectedAlerts.includes(alertId)) {
      setSelectedAlerts(selectedAlerts.filter(id => id !== alertId));
    } else {
      setSelectedAlerts([...selectedAlerts, alertId]);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800';
      case 'Investigating':
        return 'bg-yellow-100 text-yellow-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAlerts = mockFraudAlerts
    .filter(alert => 
      (alert.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
       alert.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (typeFilter === 'All' || alert.type === typeFilter) &&
      (severityFilter === 'All' || alert.severity === severityFilter)
    )
    .sort((a, b) => {
      if (sortBy === 'severity') {
        const severityOrder = { High: 3, Medium: 2, Low: 1 };
        return sortOrder === 'asc' 
          ? severityOrder[a.severity] - severityOrder[b.severity]
          : severityOrder[b.severity] - severityOrder[a.severity];
      }
      const compareValue = (val1: string, val2: string) => {
        return sortOrder === 'asc' ? val1.localeCompare(val2) : val2.localeCompare(val1);
      };
      return compareValue(a[sortBy], b[sortBy]);
    });

  const selectedAlert = selectedAlertId 
    ? mockFraudAlerts.find(alert => alert.id === selectedAlertId)
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-[#1F1F1F]">Fraud Detection</h2>
        <button className="flex items-center space-x-2 bg-[#AF583B] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#8E4730] transition-colors">
          <Shield className="w-4 h-4" />
          <span>Run Detection</span>
        </button>
      </div>

      {/* Fraud Activity Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#1F1F1F]">Fraud Activity Overview</h3>
          <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="h-64">
          <Line data={fraudActivityData} options={chartOptions} />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search alerts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AF583B] focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <select 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Multiple Accounts">Multiple Accounts</option>
            <option value="Rapid Actions">Rapid Actions</option>
            <option value="Point Farming">Point Farming</option>
            <option value="Suspicious IP">Suspicious IP</option>
          </select>

          <select 
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="All">All Severity</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <select 
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#AF583B]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="userName">Sort by User</option>
              <option value="severity">Sort by Severity</option>
              <option value="detectedAt">Sort by Date</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedAlerts.length > 0 && (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {selectedAlerts.length} alerts selected
          </span>
          <div className="flex space-x-3">
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-yellow-100 text-yellow-700 hover:bg-yellow-200">
              <AlertTriangle className="w-4 h-4" />
              <span>Investigate</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200">
              <CheckCircle className="w-4 h-4" />
              <span>Mark as Valid</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200">
              <Ban className="w-4 h-4" />
              <span>Ban Users</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts Table */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedAlerts.length === mockFraudAlerts.length}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                  />
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Detected
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAlerts.map((alert) => (
                <tr 
                  key={alert.id} 
                  className={`hover:bg-gray-50 cursor-pointer ${selectedAlertId === alert.id ? 'bg-gray-50' : ''}`}
                  onClick={() => setSelectedAlertId(alert.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedAlerts.includes(alert.id)}
                      onChange={() => handleSelectAlert(alert.id)}
                      className="rounded border-gray-300 text-[#AF583B] focus:ring-[#AF583B]"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://i.pravatar.cc/40?u=${alert.userId}`}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{alert.userName}</div>
                        <div className="text-sm text-gray-500">{alert.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {alert.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(alert.severity)}`}>
                      {alert.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(alert.detectedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-900" onClick={e => e.stopPropagation()}>
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alert Details Panel */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          {selectedAlert ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#1F1F1F]">Alert Details</h3>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Description</h4>
                  <p className="text-sm text-gray-600">{selectedAlert.description}</p>
                </div>

                {/* IP Addresses */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">IP Addresses</h4>
                  <div className="space-y-1">
                    {selectedAlert.ipAddresses.map((ip, index) => (
                      <div key={index} className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded">
                        {ip}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Evidence Timeline */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Evidence Timeline</h4>
                  <div className="space-y-4">
                    {selectedAlert.evidence.map((item, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <Clock className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{item.type}</p>
                          <p className="text-sm text-gray-500">{item.value}</p>
                          <p className="text-xs text-gray-400">
                            {new Date(item.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Previous Flags */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Previous Flags</h4>
                  <div className="flex items-center space-x-2">
                    <Flag className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {selectedAlert.previousFlags} previous incidents
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Investigate</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200">
                    <Ban className="w-4 h-4" />
                    <span>Ban User</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Select an alert to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}