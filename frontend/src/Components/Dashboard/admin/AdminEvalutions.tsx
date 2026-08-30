'use client'
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  FiSearch,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiMoreVertical,
  FiFilter,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiUser,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiDownload,
  FiEye,
  FiBarChart2
} from 'react-icons/fi';
import { FaChartLine, FaClipboardList } from 'react-icons/fa';

// ==================== Types ====================

export type EvaluationType = 'Annual' | 'Quarterly' | 'Monthly' | 'Probation';
export type EvaluationStatus = 'Completed' | 'Pending' | 'In Progress' | 'Cancelled';
export type RatingLevel = 'Excellent' | 'Good' | 'Average' | 'Below Average' | 'Poor';

export interface Evaluation {
  id: number;
  employeeName: string;
  employeeId: string;
  department: string;
  evaluator: string;
  evaluationType: EvaluationType;
  date: string;
  score: number;
  status: EvaluationStatus;
  rating: RatingLevel;
  comments?: string;
  lastUpdated: string;
}

export interface FilterState {
  searchTerm: string;
  type: EvaluationType | 'All';
  status: EvaluationStatus | 'All';
  department: string;
}

export interface Statistics {
  totalEvaluations: number;
  completed: number;
  pending: number;
  inProgress: number;
  averageScore: number;
  topPerformer: string;
  topScore: number;
  typeDistribution: Record<EvaluationType, number>;
}

// ==================== Utility Functions ====================

const STATUS_CONFIG: Record<EvaluationStatus, { color: string; icon: JSX.Element }> = {
  'Completed': {
    color: 'bg-green-100 text-green-800',
    icon: <FiCheckCircle className="mr-1" aria-hidden="true" />
  },
  'Pending': {
    color: 'bg-yellow-100 text-yellow-800',
    icon: <FiClock className="mr-1" aria-hidden="true" />
  },
  'In Progress': {
    color: 'bg-blue-100 text-blue-800',
    icon: <FiAlertCircle className="mr-1" aria-hidden="true" />
  },
  'Cancelled': {
    color: 'bg-red-100 text-red-800',
    icon: <FiXCircle className="mr-1" aria-hidden="true" />
  }
};

const RATING_CONFIG: Record<RatingLevel, string> = {
  'Excellent': 'bg-purple-100 text-purple-800',
  'Good': 'bg-blue-100 text-blue-800',
  'Average': 'bg-yellow-100 text-yellow-800',
  'Below Average': 'bg-orange-100 text-orange-800',
  'Poor': 'bg-red-100 text-red-800'
};

const getScoreColor = (score: number): string => {
  if (score >= 90) return 'text-green-600';
  if (score >= 70) return 'text-blue-600';
  if (score >= 50) return 'text-yellow-600';
  return 'text-red-600';
};

const getStatusBadge = (status: EvaluationStatus): JSX.Element => {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
      {config.icon}
      {status}
    </span>
  );
};

const getRatingBadge = (rating: RatingLevel): JSX.Element => {
  const className = RATING_CONFIG[rating];
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {rating}
    </span>
  );
};

// ==================== Sample Data ====================

const SAMPLE_EVALUATIONS: Evaluation[] = [
  {
    id: 1,
    employeeName: 'John Doe',
    employeeId: 'EMP001',
    department: 'Engineering',
    evaluator: 'Sarah Manager',
    evaluationType: 'Annual',
    date: '2024-03-15',
    score: 92,
    status: 'Completed',
    rating: 'Excellent',
    comments: 'Exceptional performance throughout the year',
    lastUpdated: '2024-03-15'
  },
  {
    id: 2,
    employeeName: 'Jane Smith',
    employeeId: 'EMP002',
    department: 'Marketing',
    evaluator: 'Mike Director',
    evaluationType: 'Quarterly',
    date: '2024-03-10',
    score: 78,
    status: 'Completed',
    rating: 'Good',
    comments: 'Shows consistent improvement',
    lastUpdated: '2024-03-10'
  },
  {
    id: 3,
    employeeName: 'Robert Johnson',
    employeeId: 'EMP003',
    department: 'Sales',
    evaluator: 'Lisa VP',
    evaluationType: 'Quarterly',
    date: '2024-03-20',
    score: 65,
    status: 'In Progress',
    rating: 'Average',
    lastUpdated: '2024-03-18'
  },
  {
    id: 4,
    employeeName: 'Emily Davis',
    employeeId: 'EMP004',
    department: 'HR',
    evaluator: 'David Head',
    evaluationType: 'Probation',
    date: '2024-04-01',
    score: 85,
    status: 'Pending',
    rating: 'Good',
    lastUpdated: '2024-03-14'
  },
  {
    id: 5,
    employeeName: 'Michael Wilson',
    employeeId: 'EMP005',
    department: 'Engineering',
    evaluator: 'Sarah Manager',
    evaluationType: 'Monthly',
    date: '2024-03-05',
    score: 70,
    status: 'Completed',
    rating: 'Average',
    lastUpdated: '2024-03-05'
  },
  {
    id: 6,
    employeeName: 'Sarah Brown',
    employeeId: 'EMP006',
    department: 'Marketing',
    evaluator: 'Mike Director',
    evaluationType: 'Annual',
    date: '2024-03-25',
    score: 55,
    status: 'Cancelled',
    rating: 'Poor',
    comments: 'Needs significant improvement',
    lastUpdated: '2024-03-22'
  },
  {
    id: 7,
    employeeName: 'James Taylor',
    employeeId: 'EMP007',
    department: 'Sales',
    evaluator: 'Lisa VP',
    evaluationType: 'Quarterly',
    date: '2024-03-28',
    score: 88,
    status: 'Pending',
    rating: 'Excellent',
    lastUpdated: '2024-03-20'
  }
];

// ==================== Component ====================

const AdminEvaluations: React.FC = () => {
  // State
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    type: 'All',
    status: 'All',
    department: 'All'
  });

  const itemsPerPage: number = 5;

  // ==================== Effects ====================

  useEffect(() => {
    const fetchEvaluations = async (): Promise<void> => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setEvaluations(SAMPLE_EVALUATIONS);
      } catch (error) {
        console.error('Failed to fetch evaluations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvaluations();
  }, []);

  // ==================== Computed Values ====================

  // Get unique departments for filter
  const departments = useMemo(() => {
    return ['All', ...new Set(evaluations.map(e => e.department))];
  }, [evaluations]);

  // Filter evaluations
  const filteredEvaluations = useMemo(() => {
    return evaluations.filter(evaluation => {
      const matchesSearch = evaluation.employeeName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                            evaluation.employeeId.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                            evaluation.evaluator.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesType = filters.type === 'All' || evaluation.evaluationType === filters.type;
      const matchesStatus = filters.status === 'All' || evaluation.status === filters.status;
      const matchesDepartment = filters.department === 'All' || evaluation.department === filters.department;
      return matchesSearch && matchesType && matchesStatus && matchesDepartment;
    });
  }, [evaluations, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredEvaluations.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvaluations = filteredEvaluations.slice(indexOfFirstItem, indexOfLastItem);

  // Statistics
  const statistics = useMemo((): Statistics => {
    const total = evaluations.length;
    const completed = evaluations.filter(e => e.status === 'Completed').length;
    const pending = evaluations.filter(e => e.status === 'Pending').length;
    const inProgress = evaluations.filter(e => e.status === 'In Progress').length;
    const avgScore = total > 0 
      ? evaluations.reduce((acc, curr) => acc + curr.score, 0) / total 
      : 0;
    
    // Find top performer
    let topPerformer = 'N/A';
    let topScore = 0;
    if (evaluations.length > 0) {
      const top = evaluations.reduce((max, curr) => curr.score > max.score ? curr : max);
      topPerformer = top.employeeName;
      topScore = top.score;
    }

    // Type distribution
    const typeDistribution: Record<EvaluationType, number> = {
      'Annual': 0,
      'Quarterly': 0,
      'Monthly': 0,
      'Probation': 0
    };
    evaluations.forEach(e => {
      typeDistribution[e.evaluationType]++;
    });

    return {
      totalEvaluations: total,
      completed,
      pending,
      inProgress,
      averageScore: avgScore,
      topPerformer,
      topScore,
      typeDistribution
    };
  }, [evaluations]);

  // ==================== Handlers ====================

  const handlePageChange = useCallback((pageNumber: number): void => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  }, [totalPages]);

  const handleFilterChange = useCallback(<K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ): void => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const handleDelete = useCallback((id: number): void => {
    if (window.confirm('Are you sure you want to delete this evaluation?')) {
      setEvaluations(prev => prev.filter(e => e.id !== id));
    }
  }, []);

  const handleEdit = useCallback((id: number): void => {
    console.log('Edit evaluation:', id);
    // Implement edit logic here
  }, []);

  const handleView = useCallback((id: number): void => {
    console.log('View evaluation:', id);
    // Implement view logic here
  }, []);

  const handleDownload = useCallback((id: number): void => {
    console.log('Download report for:', id);
    // Implement download logic here
  }, []);

  // ==================== Component Render ====================

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6" role="main" aria-label="Performance Evaluations">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Performance Evaluations</h1>
            <p className="text-gray-600 mt-1">Manage and track employee performance reviews</p>
          </div>
          <button 
            className="mt-3 md:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
            aria-label="Create new evaluation"
          >
            <FiPlus className="mr-2" aria-hidden="true" />
            New Evaluation
          </button>
        </header>

        {/* Statistics Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6" aria-label="Statistics">
          <StatCard
            label="Total Evaluations"
            value={statistics.totalEvaluations}
            icon={<FaClipboardList className="h-6 w-6 text-blue-600" aria-hidden="true" />}
            bgColor="bg-blue-100"
          />
          <StatCard
            label="Completed"
            value={statistics.completed}
            icon={<FiCheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />}
            bgColor="bg-green-100"
          />
          <StatCard
            label="Pending"
            value={statistics.pending}
            icon={<FiClock className="h-6 w-6 text-yellow-600" aria-hidden="true" />}
            bgColor="bg-yellow-100"
          />
          <StatCard
            label="In Progress"
            value={statistics.inProgress}
            icon={<FiBarChart2 className="h-6 w-6 text-blue-600" aria-hidden="true" />}
            bgColor="bg-blue-100"
          />
          <StatCard
            label="Avg Score"
            value={`${statistics.averageScore.toFixed(1)}%`}
            icon={<FaChartLine className="h-6 w-6 text-purple-600" aria-hidden="true" />}
            bgColor="bg-purple-100"
          />
        </section>

        {/* Filters */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6" aria-label="Filters">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-xs">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search by name, ID, or evaluator..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                aria-label="Search evaluations"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <FilterSelect
                value={filters.type}
                onChange={(value) => handleFilterChange('type', value as EvaluationType | 'All')}
                options={['All', 'Annual', 'Quarterly', 'Monthly', 'Probation']}
                label="Type"
              />
              <FilterSelect
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value as EvaluationStatus | 'All')}
                options={['All', 'Completed', 'Pending', 'In Progress', 'Cancelled']}
                label="Status"
              />
              <FilterSelect
                value={filters.department}
                onChange={(value) => handleFilterChange('department', value)}
                options={departments}
                label="Department"
              />
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FiFilter className="mr-2" aria-hidden="true" />
                More Filters
              </button>
            </div>
          </div>
        </section>

        {/* Evaluations Table */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" aria-label="Evaluations list">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" aria-label="Loading evaluations"></div>
            </div>
          ) : filteredEvaluations.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No evaluations found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Evaluation Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score & Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentEvaluations.map((evaluation) => (
                      <EvaluationRow
                        key={evaluation.id}
                        evaluation={evaluation}
                        onView={handleView}
                        onEdit={handleEdit}
                        onDownload={handleDownload}
                        onDelete={handleDelete}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {!isLoading && filteredEvaluations.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredEvaluations.length}
                  itemsPerPage={itemsPerPage}
                  indexOfFirstItem={indexOfFirstItem}
                  indexOfLastItem={indexOfLastItem}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </section>

        {/* Quick Stats Footer */}
        <QuickStatsFooter statistics={statistics} />
      </div>
    </div>
  );
};

// ==================== Sub-components ====================

interface StatCardProps {
  label: string;
  value: string | number;
  icon: JSX.Element;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, bgColor }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`h-12 w-12 ${bgColor} rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
    </div>
  </div>
);

interface FilterSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
}

const FilterSelect: React.FC<FilterSelectProps> = ({ value, onChange, options, label }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white cursor-pointer"
      aria-label={label}
    >
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
  </div>
);

interface EvaluationRowProps {
  evaluation: Evaluation;
  onView: (id: number) => void;
  onEdit: (id: number) => void;
  onDownload: (id: number) => void;
  onDelete: (id: number) => void;
}

const EvaluationRow: React.FC<EvaluationRowProps> = ({
  evaluation,
  onView,
  onEdit,
  onDownload,
  onDelete
}) => {
  const scoreColor = getScoreColor(evaluation.score);

  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900">{evaluation.employeeName}</div>
          <div className="text-sm text-gray-500">{evaluation.employeeId}</div>
          <div className="text-xs text-gray-400">{evaluation.department}</div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="text-sm text-gray-900">{evaluation.evaluationType}</div>
        <div className="text-xs text-gray-500 flex items-center mt-1">
          <FiUser className="mr-1 h-3 w-3" aria-hidden="true" />
          Evaluator: {evaluation.evaluator}
        </div>
        {evaluation.comments && (
          <div className="text-xs text-gray-400 mt-1 truncate max-w-xs">
            "{evaluation.comments}"
          </div>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className={`text-2xl font-bold ${scoreColor}`}>
              {evaluation.score}
            </span>
            <span className="text-sm text-gray-400 ml-1">%</span>
          </div>
          {getRatingBadge(evaluation.rating)}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getStatusBadge(evaluation.status)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">
          {new Date(evaluation.date).toLocaleDateString()}
        </div>
        <div className="text-xs text-gray-400">
          Updated: {new Date(evaluation.lastUpdated).toLocaleDateString()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <ActionButton
            onClick={() => onView(evaluation.id)}
            icon={<FiEye className="h-4 w-4" aria-hidden="true" />}
            label="View Details"
            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
          />
          <ActionButton
            onClick={() => onEdit(evaluation.id)}
            icon={<FiEdit className="h-4 w-4" aria-hidden="true" />}
            label="Edit"
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          />
          <ActionButton
            onClick={() => onDownload(evaluation.id)}
            icon={<FiDownload className="h-4 w-4" aria-hidden="true" />}
            label="Download Report"
            className="text-green-600 hover:text-green-800 hover:bg-green-50"
          />
          <ActionButton
            onClick={() => onDelete(evaluation.id)}
            icon={<FiTrash2 className="h-4 w-4" aria-hidden="true" />}
            label="Delete"
            className="text-red-600 hover:text-red-800 hover:bg-red-50"
          />
          <ActionButton
            onClick={() => console.log('More options for:', evaluation.id)}
            icon={<FiMoreVertical className="h-4 w-4" aria-hidden="true" />}
            label="More options"
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          />
        </div>
      </td>
    </tr>
  );
};

interface ActionButtonProps {
  onClick: () => void;
  icon: JSX.Element;
  label: string;
  className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon, label, className = '' }) => (
  <button
    onClick={onClick}
    className={`transition-colors p-1 rounded ${className}`}
    title={label}
    aria-label={label}
  >
    {icon}
  </button>
);

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  indexOfFirstItem,
  indexOfLastItem,
  onPageChange
}) => (
  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-sm text-gray-700">
        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
        <span className="font-medium">
          {Math.min(indexOfLastItem, totalItems)}
        </span>{' '}
        of <span className="font-medium">{totalItems}</span> evaluations
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          aria-label="Previous page"
        >
          <FiChevronLeft className="inline" aria-hidden="true" />
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'border border-gray-300 hover:bg-gray-50'
            }`}
            aria-label={`Go to page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
        {totalPages > 5 && (
          <>
            <span className="px-2 py-1 text-sm text-gray-500">...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              aria-label={`Go to last page ${totalPages}`}
            >
              {totalPages}
            </button>
          </>
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border border-gray-300 rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          aria-label="Next page"
        >
          <FiChevronRight className="inline" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
);

interface QuickStatsFooterProps {
  statistics: Statistics;
}

const QuickStatsFooter: React.FC<QuickStatsFooterProps> = ({ statistics }) => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">🏆 Top Performer</h3>
      {statistics.totalEvaluations > 0 ? (
        <div className="flex items-center">
          <div className="flex-1">
            <p className="font-medium text-gray-900">{statistics.topPerformer}</p>
            <p className="text-sm text-gray-500">
              Score: {statistics.topScore}%
            </p>
          </div>
          <FiStar className="h-8 w-8 text-yellow-400" aria-hidden="true" />
        </div>
      ) : (
        <p className="text-sm text-gray-400">No evaluations yet</p>
      )}
    </div>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">📊 Type Distribution</h3>
      <div className="space-y-1">
        {(['Annual', 'Quarterly', 'Monthly', 'Probation'] as EvaluationType[]).map(type => {
          const count = statistics.typeDistribution[type] || 0;
          return (
            <div key={type} className="flex justify-between text-sm">
              <span className="text-gray-600">{type}</span>
              <span className="font-medium text-gray-900">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">⚡ Quick Actions</h3>
      <div className="flex flex-col space-y-2">
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          <FiPlus className="mr-2" aria-hidden="true" /> Schedule New Evaluation
        </button>
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          <FiDownload className="mr-2" aria-hidden="true" /> Export All Reports
        </button>
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          <FiBarChart2 className="mr-2" aria-hidden="true" /> View Analytics
        </button>
      </div>
    </div>
  </div>
);

export default AdminEvaluations;