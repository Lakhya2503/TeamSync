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
  FiClock,
  FiMapPin,
  FiUsers,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
  FiDollarSign,
  FiDownload,
  FiEye,
  FiRefreshCw,
  FiInfo
} from 'react-icons/fi';
import { 
  FaChair,
  FaRoute,
  FaRegClock
} from 'react-icons/fa';
import { BsFillAirplaneFill } from 'react-icons/bs';

// ==================== Types ====================

export type FlightClass = 'Economy' | 'Business' | 'First';
export type BookingStatus = 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
export type PaymentStatus = 'Paid' | 'Pending' | 'Refunded';

export interface FlightBooking {
  id: number;
  bookingReference: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  flightNumber: string;
  airline: string;
  departureCity: string;
  arrivalCity: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  seatNumber: string;
  class: FlightClass;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  ticketPrice: number;
  totalPrice: number;
  passengers: number;
  baggage: number;
  specialRequests: string;
  bookingDate: string;
}

export interface FilterState {
  status: BookingStatus | 'All';
  class: FlightClass | 'All';
  airline: string;
  searchTerm: string;
}

export interface Statistics {
  totalBookings: number;
  confirmed: number;
  pending: number;
  completed: number;
  totalRevenue: number;
  averageTicketPrice: number;
  mostPopularClass: FlightClass | string;
  totalPassengers: number;
}

// ==================== Utility Functions ====================

const getStatusConfig = (status: BookingStatus): { color: string; icon: JSX.Element } => {
  const configs: Record<BookingStatus, { color: string; icon: JSX.Element }> = {
    'Confirmed': { 
      color: 'bg-green-100 text-green-800', 
      icon: <FiCheckCircle className="mr-1" aria-hidden="true" /> 
    },
    'Pending': { 
      color: 'bg-yellow-100 text-yellow-800', 
      icon: <FiClock className="mr-1" aria-hidden="true" /> 
    },
    'Cancelled': { 
      color: 'bg-red-100 text-red-800', 
      icon: <FiXCircle className="mr-1" aria-hidden="true" /> 
    },
    'Completed': { 
      color: 'bg-blue-100 text-blue-800', 
      icon: <FiCheckCircle className="mr-1" aria-hidden="true" /> 
    }
  };
  return configs[status];
};

const getPaymentStatusConfig = (status: PaymentStatus): string => {
  const configs: Record<PaymentStatus, string> = {
    'Paid': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Refunded': 'bg-purple-100 text-purple-800'
  };
  return configs[status];
};

const getClassConfig = (className: FlightClass): string => {
  const configs: Record<FlightClass, string> = {
    'Economy': 'bg-gray-100 text-gray-800',
    'Business': 'bg-blue-100 text-blue-800',
    'First': 'bg-purple-100 text-purple-800'
  };
  return configs[className];
};

// ==================== Sample Data ====================

const SAMPLE_BOOKINGS: FlightBooking[] = [
  {
    id: 1,
    bookingReference: 'FL12345',
    passengerName: 'John Doe',
    passengerEmail: 'john.doe@email.com',
    passengerPhone: '+1 234-567-8900',
    flightNumber: 'AA102',
    airline: 'American Airlines',
    departureCity: 'New York (JFK)',
    arrivalCity: 'Los Angeles (LAX)',
    departureDate: '2024-04-15',
    departureTime: '08:30',
    arrivalDate: '2024-04-15',
    arrivalTime: '11:45',
    seatNumber: '12A',
    class: 'Business',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    ticketPrice: 450,
    totalPrice: 450,
    passengers: 1,
    baggage: 2,
    specialRequests: 'Window seat, vegetarian meal',
    bookingDate: '2024-03-01'
  },
  {
    id: 2,
    bookingReference: 'FL12346',
    passengerName: 'Jane Smith',
    passengerEmail: 'jane.smith@email.com',
    passengerPhone: '+1 345-678-9012',
    flightNumber: 'UA205',
    airline: 'United Airlines',
    departureCity: 'Chicago (ORD)',
    arrivalCity: 'Miami (MIA)',
    departureDate: '2024-04-20',
    departureTime: '14:15',
    arrivalDate: '2024-04-20',
    arrivalTime: '18:30',
    seatNumber: '8B',
    class: 'Economy',
    status: 'Pending',
    paymentStatus: 'Pending',
    ticketPrice: 280,
    totalPrice: 560,
    passengers: 2,
    baggage: 3,
    specialRequests: 'Aisle seat',
    bookingDate: '2024-03-05'
  },
  {
    id: 3,
    bookingReference: 'FL12347',
    passengerName: 'Robert Johnson',
    passengerEmail: 'robert.j@email.com',
    passengerPhone: '+1 456-789-0123',
    flightNumber: 'DL307',
    airline: 'Delta Airlines',
    departureCity: 'Atlanta (ATL)',
    arrivalCity: 'London (LHR)',
    departureDate: '2024-05-01',
    departureTime: '22:00',
    arrivalDate: '2024-05-02',
    arrivalTime: '10:30',
    seatNumber: '4F',
    class: 'First',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    ticketPrice: 1200,
    totalPrice: 1200,
    passengers: 1,
    baggage: 3,
    specialRequests: 'Extra legroom',
    bookingDate: '2024-02-15'
  },
  {
    id: 4,
    bookingReference: 'FL12348',
    passengerName: 'Emily Davis',
    passengerEmail: 'emily.d@email.com',
    passengerPhone: '+1 567-890-1234',
    flightNumber: 'SW408',
    airline: 'Southwest Airlines',
    departureCity: 'Denver (DEN)',
    arrivalCity: 'Las Vegas (LAS)',
    departureDate: '2024-04-10',
    departureTime: '09:45',
    arrivalDate: '2024-04-10',
    arrivalTime: '11:15',
    seatNumber: '22C',
    class: 'Economy',
    status: 'Completed',
    paymentStatus: 'Paid',
    ticketPrice: 180,
    totalPrice: 540,
    passengers: 3,
    baggage: 4,
    specialRequests: 'Near restroom',
    bookingDate: '2024-02-28'
  },
  {
    id: 5,
    bookingReference: 'FL12349',
    passengerName: 'Michael Wilson',
    passengerEmail: 'michael.w@email.com',
    passengerPhone: '+1 678-901-2345',
    flightNumber: 'AA509',
    airline: 'American Airlines',
    departureCity: 'San Francisco (SFO)',
    arrivalCity: 'Tokyo (NRT)',
    departureDate: '2024-05-15',
    departureTime: '12:00',
    arrivalDate: '2024-05-16',
    arrivalTime: '15:30',
    seatNumber: '9D',
    class: 'Business',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    ticketPrice: 950,
    totalPrice: 950,
    passengers: 1,
    baggage: 2,
    specialRequests: 'Vegetarian meal, extra pillow',
    bookingDate: '2024-03-10'
  },
  {
    id: 6,
    bookingReference: 'FL12350',
    passengerName: 'Sarah Brown',
    passengerEmail: 'sarah.b@email.com',
    passengerPhone: '+1 789-012-3456',
    flightNumber: 'UA610',
    airline: 'United Airlines',
    departureCity: 'Boston (BOS)',
    arrivalCity: 'Seattle (SEA)',
    departureDate: '2024-04-25',
    departureTime: '07:00',
    arrivalDate: '2024-04-25',
    arrivalTime: '10:30',
    seatNumber: '15E',
    class: 'Economy',
    status: 'Pending',
    paymentStatus: 'Pending',
    ticketPrice: 320,
    totalPrice: 960,
    passengers: 3,
    baggage: 5,
    specialRequests: 'None',
    bookingDate: '2024-03-12'
  }
];

// ==================== Component ====================

const AdminPlane: React.FC = () => {
  // State
  const [bookings, setBookings] = useState<FlightBooking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    status: 'All',
    class: 'All',
    airline: 'All'
  });

  const itemsPerPage: number = 5;

  // ==================== Effects ====================

  useEffect(() => {
    const fetchBookings = async (): Promise<void> => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setBookings(SAMPLE_BOOKINGS);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ==================== Computed Values ====================

  // Get unique airlines for filter
  const airlines: string[] = useMemo(() => {
    return ['All', ...new Set(bookings.map(b => b.airline))];
  }, [bookings]);

  // Filter bookings
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesSearch = booking.passengerName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                            booking.bookingReference.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                            booking.flightNumber.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                            booking.airline.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesStatus = filters.status === 'All' || booking.status === filters.status;
      const matchesClass = filters.class === 'All' || booking.class === filters.class;
      const matchesAirline = filters.airline === 'All' || booking.airline === filters.airline;
      return matchesSearch && matchesStatus && matchesClass && matchesAirline;
    });
  }, [bookings, filters]);

  // Pagination
  const totalPages: number = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentBookings: FlightBooking[] = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  // Statistics
  const statistics: Statistics = useMemo(() => {
    const total = bookings.length;
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
    const pending = bookings.filter(b => b.status === 'Pending').length;
    const completed = bookings.filter(b => b.status === 'Completed').length;
    const totalRevenue = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const avgPrice = total > 0 ? bookings.reduce((acc, curr) => acc + curr.ticketPrice, 0) / total : 0;
    const totalPassengers = bookings.reduce((acc, curr) => acc + curr.passengers, 0);
    
    // Find most popular class
    const classCounts: Record<FlightClass, number> = {
      'Economy': 0,
      'Business': 0,
      'First': 0
    };
    bookings.forEach(b => classCounts[b.class]++);
    const mostPopular = Object.entries(classCounts).sort((a, b) => b[1] - a[1])[0];
    
    return {
      totalBookings: total,
      confirmed,
      pending,
      completed,
      totalRevenue,
      averageTicketPrice: avgPrice,
      mostPopularClass: mostPopular ? mostPopular[0] : 'N/A',
      totalPassengers
    };
  }, [bookings]);

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
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  const handleDelete = useCallback((id: number): void => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  }, []);

  const handleEdit = useCallback((id: number): void => {
    setSelectedBooking(id);
    console.log('Edit booking:', id);
    // Implement edit logic here
  }, []);

  const handleView = useCallback((id: number): void => {
    console.log('View booking:', id);
    // Implement view logic here
  }, []);

  // ==================== Render Helpers ====================

  const renderStatusBadge = (status: BookingStatus): JSX.Element => {
    const config = getStatusConfig(status);
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {status}
      </span>
    );
  };

  const renderPaymentStatusBadge = (status: PaymentStatus): JSX.Element => {
    const className = getPaymentStatusConfig(status);
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
        {status}
      </span>
    );
  };

  const renderClassBadge = (className: FlightClass): JSX.Element => {
    const classNameConfig = getClassConfig(className);
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${classNameConfig}`}>
        {className}
      </span>
    );
  };

  // ==================== Component Render ====================

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6" role="main" aria-label="Flight Bookings Management">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Flight Bookings</h1>
            <p className="text-gray-600 mt-1">Manage and monitor all flight reservations</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
            <button 
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
              aria-label="Create new booking"
            >
              <FiPlus className="mr-2" aria-hidden="true" />
              New Booking
            </button>
            <button 
              className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors duration-200"
              aria-label="Export bookings"
            >
              <FiDownload className="mr-2" aria-hidden="true" />
              Export
            </button>
          </div>
        </header>

        {/* Statistics Cards */}
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6" aria-label="Statistics">
          <StatCard
            label="Total Bookings"
            value={statistics.totalBookings}
            icon={<BsFillAirplaneFill className="h-6 w-6 text-blue-600" aria-hidden="true" />}
            bgColor="bg-blue-100"
          />
          <StatCard
            label="Confirmed"
            value={statistics.confirmed}
            icon={<FiCheckCircle className="h-6 w-6 text-green-600" aria-hidden="true" />}
            bgColor="bg-green-100"
          />
          <StatCard
            label="Pending"
            value={statistics.pending}
            icon={<FaRegClock className="h-6 w-6 text-yellow-600" aria-hidden="true" />}
            bgColor="bg-yellow-100"
          />
          <StatCard
            label="Completed"
            value={statistics.completed}
            icon={<FiCheckCircle className="h-6 w-6 text-blue-600" aria-hidden="true" />}
            bgColor="bg-blue-100"
          />
          <StatCard
            label="Total Revenue"
            value={`$${statistics.totalRevenue.toLocaleString()}`}
            icon={<FiDollarSign className="h-6 w-6 text-purple-600" aria-hidden="true" />}
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
                placeholder="Search by name, reference, flight..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                aria-label="Search bookings"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <FilterSelect
                value={filters.status}
                onChange={(value) => handleFilterChange('status', value as BookingStatus | 'All')}
                options={['All', 'Confirmed', 'Pending', 'Cancelled', 'Completed']}
                label="Status"
              />
              <FilterSelect
                value={filters.class}
                onChange={(value) => handleFilterChange('class', value as FlightClass | 'All')}
                options={['All', 'Economy', 'Business', 'First']}
                label="Class"
              />
              <FilterSelect
                value={filters.airline}
                onChange={(value) => handleFilterChange('airline', value)}
                options={airlines}
                label="Airline"
              />
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FiFilter className="mr-2" aria-hidden="true" />
                More Filters
              </button>
            </div>
          </div>
        </section>

        {/* Bookings Table */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" aria-label="Bookings list">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" aria-label="Loading bookings"></div>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No bookings found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Booking Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Flight Info
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Passenger
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class & Seat
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              <BsFillAirplaneFill className="inline mr-2 h-4 w-4 text-blue-500" aria-hidden="true" />
                              {booking.flightNumber}
                            </div>
                            <div className="text-xs text-gray-500">Ref: {booking.bookingReference}</div>
                            <div className="text-xs text-gray-400">{booking.airline}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="flex items-center">
                              <FiMapPin className="mr-1 h-3 w-3 text-gray-400" aria-hidden="true" />
                              <span className="font-medium text-gray-900">{booking.departureCity}</span>
                            </div>
                            <div className="flex items-center my-1">
                              <FaRoute className="mr-1 h-3 w-3 text-gray-400" aria-hidden="true" />
                            </div>
                            <div className="flex items-center">
                              <FiMapPin className="mr-1 h-3 w-3 text-gray-400" aria-hidden="true" />
                              <span className="font-medium text-gray-900">{booking.arrivalCity}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{booking.passengerName}</div>
                            <div className="text-xs text-gray-500">{booking.passengerEmail}</div>
                            <div className="flex items-center text-xs text-gray-400 mt-1">
                              <FiUsers className="mr-1 h-3 w-3" aria-hidden="true" />
                              {booking.passengers} passenger{booking.passengers > 1 ? 's' : ''}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            {renderClassBadge(booking.class)}
                            <div className="text-xs text-gray-500 mt-1">Seat: {booking.seatNumber}</div>
                            <div className="text-xs text-gray-400 flex items-center mt-1">
                              <FaChair className="mr-1 h-3 w-3" aria-hidden="true" />
                              {booking.baggage} bags
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            {renderStatusBadge(booking.status)}
                            <div>
                              {renderPaymentStatusBadge(booking.paymentStatus)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-semibold text-gray-900">${booking.totalPrice}</div>
                            <div className="text-xs text-gray-500">${booking.ticketPrice}/ticket</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <ActionButton
                              onClick={() => handleView(booking.id)}
                              icon={<FiEye className="h-4 w-4" aria-hidden="true" />}
                              label="View Details"
                              className="text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                            />
                            <ActionButton
                              onClick={() => handleEdit(booking.id)}
                              icon={<FiEdit className="h-4 w-4" aria-hidden="true" />}
                              label="Edit"
                              className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                            />
                            <ActionButton
                              onClick={() => console.log('Send confirmation for:', booking.id)}
                              icon={<FiRefreshCw className="h-4 w-4" aria-hidden="true" />}
                              label="Send Confirmation"
                              className="text-green-600 hover:text-green-800 hover:bg-green-50"
                            />
                            <ActionButton
                              onClick={() => handleDelete(booking.id)}
                              icon={<FiTrash2 className="h-4 w-4" aria-hidden="true" />}
                              label="Delete"
                              className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            />
                            <ActionButton
                              onClick={() => console.log('More options for:', booking.id)}
                              icon={<FiMoreVertical className="h-4 w-4" aria-hidden="true" />}
                              label="More options"
                              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {!isLoading && filteredBookings.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredBookings.length}
                  itemsPerPage={itemsPerPage}
                  indexOfFirstItem={indexOfFirstItem}
                  indexOfLastItem={indexOfLastItem}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </section>

        {/* Quick Actions and Info */}
        <QuickActionsSection statistics={statistics} />
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
        of <span className="font-medium">{totalItems}</span> bookings
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

interface QuickActionsSectionProps {
  statistics: Statistics;
}

const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({ statistics }) => (
  <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">📊 Quick Stats</h3>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Average Ticket Price</span>
          <span className="font-medium text-gray-900">
            ${statistics.averageTicketPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Most Popular Class</span>
          <span className="font-medium text-gray-900">{statistics.mostPopularClass}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Passengers</span>
          <span className="font-medium text-gray-900">{statistics.totalPassengers}</span>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">🚀 Quick Actions</h3>
      <div className="flex flex-col space-y-2">
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          <FiPlus className="mr-2" aria-hidden="true" /> Create New Booking
        </button>
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          <FiDownload className="mr-2" aria-hidden="true" /> Download Manifest
        </button>
        <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
          <FiRefreshCw className="mr-2" aria-hidden="true" /> Check Flight Status
        </button>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">⚠️ Alerts</h3>
      <div className="space-y-1">
        <p className="text-sm text-yellow-600 flex items-center">
          <FiAlertCircle className="mr-2" aria-hidden="true" />
          {statistics.pending} pending bookings need attention
        </p>
        <p className="text-sm text-green-600 flex items-center">
          <FiCheckCircle className="mr-2" aria-hidden="true" />
          {statistics.completed} flights completed today
        </p>
        <p className="text-sm text-blue-600 flex items-center">
          <FiInfo className="mr-2" aria-hidden="true" />
          {statistics.confirmed} upcoming flights
        </p>
      </div>
    </div>
  </div>
);

export default AdminPlane;