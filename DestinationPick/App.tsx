import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Define user roles as type
type UserRole = 'admin' | 'client';

// Define user type with role
type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
};

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Mock users with roles for demonstration
  const mockUsers: User[] = [
    { id: '1', email: 'client@example.com', password: 'password123', name: 'Client User', role: 'client' },
    { id: '2', email: 'admin@example.com', password: 'admin123', name: 'Admin User', role: 'admin' }
  ];

  const handleLogin = () => {
    setLoading(true);
    setError('');
    
    // Simulate API delay
    setTimeout(() => {
      const foundUser = mockUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (foundUser) {
        // Set the current user with their role
        setCurrentUser(foundUser);
        setIsLoggedIn(true);
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 1000);
  };

  // Wedding dashboard data (mock data for demonstration)
  const weddingData = {
    couple: "Sarah & Michael",
    date: "June 15, 2026",
    location: "Grand Palms Resort, Cancun",
    documentsAndContracts: [
      { id: '1', name: 'Venue Contract', type: 'PDF', dateUploaded: '2025-01-15', signed: true },
      { id: '2', name: 'Catering Agreement', type: 'PDF', dateUploaded: '2025-02-10', signed: true },
      { id: '3', name: 'Photography Contract', type: 'DOCX', dateUploaded: '2025-02-28', signed: false },
      { id: '4', name: 'Travel Itinerary', type: 'PDF', dateUploaded: '2025-03-05', signed: false },
    ],
    payments: [
      { id: '1', description: 'Deposit', amount: 2000, date: '2025-01-15', status: 'Paid' },
      { id: '2', description: 'Venue Payment 1', amount: 3500, date: '2025-03-01', status: 'Paid' },
      { id: '3', description: 'Photographer', amount: 1800, date: '2025-04-15', status: 'Pending' },
      { id: '4', description: 'Final Balance', amount: 4500, date: '2025-09-15', status: 'Upcoming' },
    ],
    totalBudget: 12800,
    paidAmount: 5500,
  };

  // Admin Dashboard Component
  const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('clients');
    
    // Mock client list for admin
    const mockClients = [
      { id: '1', name: 'Sarah & Michael', date: 'June 15, 2026', location: 'Cancun', progress: 43 },
      { id: '2', name: 'Emma & John', date: 'August 22, 2026', location: 'Bali', progress: 65 },
      { id: '3', name: 'Jessica & David', date: 'October 5, 2026', location: 'Hawaii', progress: 28 },
    ];

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.dashboardHeader}>
          <Text style={styles.dashboardTitle}>Admin Dashboard</Text>
          <Text style={styles.adminGreeting}>Welcome, {currentUser?.name}</Text>
        </View>
        
        {/* Tab navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'clients' && styles.activeTab]} 
            onPress={() => setActiveTab('clients')}
          >
            <Text style={[styles.tabText, activeTab === 'clients' && styles.activeTabText]}>Client List</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'documents' && styles.activeTab]} 
            onPress={() => setActiveTab('documents')}
          >
            <Text style={[styles.tabText, activeTab === 'documents' && styles.activeTabText]}>Documents</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'payments' && styles.activeTab]} 
            onPress={() => setActiveTab('payments')}
          >
            <Text style={[styles.tabText, activeTab === 'payments' && styles.activeTabText]}>Payments</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.contentContainer}
          contentContainerStyle={styles.scrollContentContainer}
          showsHorizontalScrollIndicator={false}
        >
          {activeTab === 'clients' && (
            <View>
              <Text style={styles.sectionTitle}>Client Weddings</Text>
              
              {mockClients.map(client => (
                <View key={client.id} style={styles.clientCard}>
                  <View style={styles.clientInfo}>
                    <Text style={styles.clientName}>{client.name}</Text>
                    <Text style={styles.clientDetails}>{client.date} • {client.location}</Text>
                  </View>
                  <View style={styles.clientProgressContainer}>
                    <Text style={styles.clientProgressLabel}>Progress</Text>
                    <View style={styles.progressBarContainer}>
                      <View style={[styles.progressBar, { width: `${client.progress}%` }]} />
                    </View>
                    <Text style={styles.clientProgressText}>{client.progress}%</Text>
                  </View>
                  <View style={styles.clientActions}>
                    <TouchableOpacity style={styles.viewDetailsButton}>
                      <Text style={styles.viewDetailsText}>View Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactClientButton}>
                      <Text style={styles.contactClientText}>Contact</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
              
              <TouchableOpacity style={styles.addClientButton}>
                <Text style={styles.addClientText}>+ Add New Client</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {/* Other admin tabs would go here */}
        </ScrollView>
        
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => {
            setIsLoggedIn(false);
            setCurrentUser(null);
          }}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  // Client Dashboard component
  const ClientDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.dashboardHeader}>
          <Text style={styles.dashboardTitle}>Wedding Dashboard</Text>
          <Text style={styles.coupleNames} numberOfLines={1} ellipsizeMode="tail">{weddingData.couple}</Text>
          <Text style={styles.weddingDate} numberOfLines={1} ellipsizeMode="tail">{weddingData.date} · {weddingData.location}</Text>
        </View>
        
        {/* Tab navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'overview' && styles.activeTab]} 
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>Overview</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'documents' && styles.activeTab]} 
            onPress={() => setActiveTab('documents')}
          >
            <Text style={[styles.tabText, activeTab === 'documents' && styles.activeTabText]}>Documents</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'payments' && styles.activeTab]} 
            onPress={() => setActiveTab('payments')}
          >
            <Text style={[styles.tabText, activeTab === 'payments' && styles.activeTabText]}>Payments</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          style={styles.contentContainer}
          contentContainerStyle={styles.scrollContentContainer}
          showsHorizontalScrollIndicator={false}
        >
          {activeTab === 'overview' && (
            <View>
              <View style={styles.overviewCard}>
                <Text style={styles.overviewCardTitle}>Wedding Summary</Text>
                <View style={styles.overviewDetail}>
                  <Text style={styles.overviewLabel}>Date:</Text>
                  <Text style={styles.overviewValue}>{weddingData.date}</Text>
                </View>
                <View style={styles.overviewDetail}>
                  <Text style={styles.overviewLabel}>Location:</Text>
                  <Text style={styles.overviewValue}>{weddingData.location}</Text>
                </View>
                <View style={styles.overviewDetail}>
                  <Text style={styles.overviewLabel}>Budget:</Text>
                  <Text style={styles.overviewValue}>${weddingData.totalBudget.toLocaleString()}</Text>
                </View>
                <View style={styles.overviewDetail}>
                  <Text style={styles.overviewLabel}>Paid:</Text>
                  <Text style={styles.overviewValue}>${weddingData.paidAmount.toLocaleString()} (${(weddingData.paidAmount / weddingData.totalBudget * 100).toFixed(0)}%)</Text>
                </View>
              </View>
              
              <View style={styles.progressCard}>
                <Text style={styles.progressTitle}>Payment Progress</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${(weddingData.paidAmount / weddingData.totalBudget * 100)}%` }]} />
                </View>
                <Text style={styles.progressText}>${weddingData.paidAmount.toLocaleString()} of ${weddingData.totalBudget.toLocaleString()}</Text>
              </View>
              
              <TouchableOpacity style={styles.contactPlannerButton}>
                <Text style={styles.contactPlannerText}>Contact Your Planner</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {activeTab === 'documents' && (
            <View style={styles.documentsContainer}>
              <Text style={styles.sectionTitle}>Contracts & Documents</Text>
              
              {weddingData.documentsAndContracts.map(doc => (
                <View key={doc.id} style={styles.documentCard}>
                  <View style={styles.documentInfo}>
                    <Text style={styles.documentName}>{doc.name}</Text>
                    <Text style={styles.documentMeta}>{doc.type} • Uploaded {doc.dateUploaded}</Text>
                  </View>
                  <View style={styles.documentActions}>
                    {doc.signed ? (
                      <View style={styles.signedBadge}>
                        <Text style={styles.signedBadgeText}>Signed</Text>
                      </View>
                    ) : (
                      <TouchableOpacity style={styles.signButton}>
                        <Text style={styles.signButtonText}>Sign</Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
          
          {activeTab === 'payments' && (
            <View style={styles.paymentsContainer}>
              <Text style={styles.sectionTitle}>Payment Schedule</Text>
              
              <View style={styles.paymentSummary}>
                <View style={styles.paymentSummaryItem}>
                  <Text style={styles.paymentSummaryLabel}>Total Budget</Text>
                  <Text style={styles.paymentSummaryValue}>${weddingData.totalBudget.toLocaleString()}</Text>
                </View>
                <View style={styles.paymentSummaryItem}>
                  <Text style={styles.paymentSummaryLabel}>Paid</Text>
                  <Text style={[styles.paymentSummaryValue, { color: '#4CAF50' }]}>${weddingData.paidAmount.toLocaleString()}</Text>
                </View>
                <View style={styles.paymentSummaryItem}>
                  <Text style={styles.paymentSummaryLabel}>Remaining</Text>
                  <Text style={[styles.paymentSummaryValue, { color: '#FF9800' }]}>${(weddingData.totalBudget - weddingData.paidAmount).toLocaleString()}</Text>
                </View>
              </View>
              
              <View style={styles.paymentsList}>
                {weddingData.payments.map(payment => (
                  <View key={payment.id} style={styles.paymentCard}>
                    <View style={styles.paymentInfo}>
                      <Text style={styles.paymentDescription}>{payment.description}</Text>
                      <Text style={styles.paymentAmount}>${payment.amount.toLocaleString()}</Text>
                    </View>
                    <View style={styles.paymentMetaInfo}>
                      <Text style={styles.paymentDate}>Due: {payment.date}</Text>
                      <View style={[styles.paymentStatusBadge, 
                        payment.status === 'Paid' && styles.paidBadge,
                        payment.status === 'Pending' && styles.pendingBadge,
                        payment.status === 'Upcoming' && styles.upcomingBadge
                      ]}>
                        <Text style={styles.paymentStatusText}>{payment.status}</Text>
                      </View>
                    </View>
                    {payment.status !== 'Paid' && (
                      <TouchableOpacity style={styles.makePaymentButton}>
                        <Text style={styles.makePaymentButtonText}>Make Payment</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
        
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={() => {
            setIsLoggedIn(false);
            setCurrentUser(null);
          }}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  // If logged in, show the appropriate dashboard based on user role
  if (isLoggedIn && currentUser) {
    return currentUser.role === 'admin' ? <AdminDashboard /> : <ClientDashboard />;
  }

  // Login screen
  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}
    >
      <View style={styles.cardContainer}>
        <Text style={styles.title}>DestinationPick</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.helpText}>
          Demo accounts: {"\n"}
          client@example.com / password123 {"\n"}
          admin@example.com / admin123
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeContent: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4c669f',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#4c669f',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
  },
  helpText: {
    marginTop: 24,
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
  dashboardHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  coupleNames: {
    fontSize: 18,
    color: '#666',
    marginBottom: 4,
  },
  weddingDate: {
    fontSize: 16,
    color: '#666',
  },
  adminGreeting: {
    fontSize: 16,
    color: '#666',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  tab: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    flex: 1,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomColor: '#4c669f',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#4c669f',
    fontWeight: '600',
  },
  contentContainer: {
    width: '100%',
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  overviewCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    width: '100%',
  },
  overviewCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  overviewDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  overviewLabel: {
    fontSize: 16,
    color: '#666',
  },
  overviewValue: {
    fontSize: 16,
    color: '#333',
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    width: '100%',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 10,
    borderRadius: 10,
    backgroundColor: '#ddd',
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    borderRadius: 10,
    backgroundColor: '#4c669f',
  },
  progressText: {
    fontSize: 16,
    color: '#666',
  },
  contactPlannerButton: {
    backgroundColor: '#4c669f',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    width: '100%',
  },
  contactPlannerText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
  documentsContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  documentCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    width: '100%',
  },
  documentInfo: {
    flex: 1,
    marginBottom: 10,
  },
  documentName: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  documentMeta: {
    fontSize: 14,
    color: '#666',
  },
  documentActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  signedBadge: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
  },
  signedBadgeText: {
    fontSize: 12,
    color: 'white',
  },
  signButton: {
    backgroundColor: '#4c669f',
    padding: 10,
    borderRadius: 5,
  },
  signButtonText: {
    fontSize: 14,
    color: 'white',
  },
  viewButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
  },
  viewButtonText: {
    fontSize: 14,
    color: 'white',
  },
  paymentsContainer: {
    padding: 16,
  },
  paymentSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  paymentSummaryItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentSummaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  paymentSummaryValue: {
    fontSize: 16,
    color: '#333',
  },
  paymentsList: {
    marginBottom: 20,
  },
  paymentCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    width: '100%',
  },
  paymentInfo: {
    flex: 1,
    marginBottom: 10,
  },
  paymentDescription: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  paymentAmount: {
    fontSize: 16,
    color: '#666',
  },
  paymentMetaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentDate: {
    fontSize: 14,
    color: '#666',
  },
  paymentStatusBadge: {
    padding: 5,
    borderRadius: 5,
  },
  paidBadge: {
    backgroundColor: '#4CAF50',
  },
  pendingBadge: {
    backgroundColor: '#FF9800',
  },
  upcomingBadge: {
    backgroundColor: '#4c669f',
  },
  paymentStatusText: {
    fontSize: 12,
    color: 'white',
  },
  makePaymentButton: {
    backgroundColor: '#4c669f',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  makePaymentButtonText: {
    fontSize: 14,
    color: 'white',
  },
  // Admin specific styles
  clientCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginTop: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    width: '100%',
  },
  clientInfo: {
    marginBottom: 10,
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  clientDetails: {
    fontSize: 14,
    color: '#666',
  },
  clientProgressContainer: {
    marginBottom: 14,
  },
  clientProgressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  clientProgressText: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
  },
  clientActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  viewDetailsButton: {
    backgroundColor: '#4c669f',
    padding: 10,
    borderRadius: 5,
  },
  viewDetailsText: {
    fontSize: 14,
    color: 'white',
  },
  contactClientButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
  },
  contactClientText: {
    fontSize: 14,
    color: 'white',
  },
  addClientButton: {
    backgroundColor: '#4c669f',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  addClientText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});
