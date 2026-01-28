import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {appointmentService} from '../services';

const AppointmentsScreen = ({navigation}) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadAppointments();
    });

    return unsubscribe;
  }, [navigation]);

  const loadAppointments = async () => {
    try {
      const response = await appointmentService.getAppointments();
      if (response.success) {
        setAppointments(response.data);
      }
    } catch (error) {
      console.error('Error loading appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async appointmentId => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        {text: 'No', style: 'cancel'},
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await appointmentService.updateAppointment(appointmentId, {
                status: 'cancelled',
              });
              loadAppointments();
              Alert.alert('Success', 'Appointment cancelled successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to cancel appointment');
            }
          },
        },
      ],
    );
  };

  const getStatusColor = status => {
    switch (status) {
      case 'pending':
        return '#FFA500';
      case 'confirmed':
        return '#007AFF';
      case 'completed':
        return '#4CAF50';
      case 'cancelled':
        return '#F44336';
      default:
        return '#999';
    }
  };

  const renderAppointment = ({item}) => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.serviceName}>{item.service?.name}</Text>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(item.status)},
          ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <Text style={styles.barberName}>Barber: {item.barber?.name}</Text>
      <Text style={styles.appointmentDate}>
        Date: {new Date(item.date).toLocaleDateString()}
      </Text>
      <Text style={styles.appointmentTime}>Time: {item.time}</Text>
      <Text style={styles.appointmentPrice}>
        Price: ${item.service?.price}
      </Text>

      {item.status === 'pending' && (
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => handleCancelAppointment(item._id)}>
          <Text style={styles.cancelButtonText}>Cancel Appointment</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (appointments.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>No appointments yet</Text>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.bookButtonText}>Book an Appointment</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContainer: {
    padding: 15,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  barberName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  appointmentDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  appointmentTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  appointmentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 5,
  },
  cancelButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppointmentsScreen;
