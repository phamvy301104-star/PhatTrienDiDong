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
import {barberService, appointmentService} from '../services';

const BookAppointmentScreen = ({route, navigation}) => {
  const {service} = route.params;
  const [barbers, setBarbers] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    loadBarbers();
  }, []);

  const loadBarbers = async () => {
    try {
      const response = await barberService.getBarbers();
      if (response.success) {
        setBarbers(response.data);
      }
    } catch (error) {
      console.error('Error loading barbers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Generate next 7 days for date selection
  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const formatDate = date => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      day: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
    };
  };

  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  const handleBooking = async () => {
    if (!selectedBarber) {
      Alert.alert('Error', 'Please select a barber');
      return;
    }

    setBooking(true);
    try {
      const appointmentData = {
        service: service._id,
        barber: selectedBarber._id,
        date: selectedDate,
        time: selectedTime,
      };

      const response = await appointmentService.createAppointment(
        appointmentData,
      );

      if (response.success) {
        Alert.alert('Success', 'Appointment booked successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Appointments'),
          },
        ]);
      }
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to book appointment',
      );
    } finally {
      setBooking(false);
    }
  };

  const renderBarber = ({item}) => (
    <TouchableOpacity
      style={[
        styles.barberCard,
        selectedBarber?._id === item._id && styles.selectedBarberCard,
      ]}
      onPress={() => setSelectedBarber(item)}>
      <Text style={styles.barberName}>{item.name}</Text>
      <Text style={styles.barberSpecialization}>{item.specialization}</Text>
      <Text style={styles.barberExperience}>
        {item.experience} years experience
      </Text>
      <Text style={styles.barberRating}>★ {item.rating.toFixed(1)}</Text>
    </TouchableOpacity>
  );

  const renderDateSlot = ({item}) => {
    const formatted = formatDate(item);
    const isSelected = item.toDateString() === selectedDate.toDateString();
    
    return (
      <TouchableOpacity
        style={[
          styles.dateSlot,
          isSelected && styles.selectedDateSlot,
        ]}
        onPress={() => setSelectedDate(item)}>
        <Text style={[styles.dayText, isSelected && styles.selectedDateText]}>
          {formatted.day}
        </Text>
        <Text style={[styles.dateText, isSelected && styles.selectedDateText]}>
          {formatted.date}
        </Text>
        <Text style={[styles.monthText, isSelected && styles.selectedDateText]}>
          {formatted.month}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderTimeSlot = ({item}) => (
    <TouchableOpacity
      style={[
        styles.timeSlot,
        selectedTime === item && styles.selectedTimeSlot,
      ]}
      onPress={() => setSelectedTime(item)}>
      <Text
        style={[
          styles.timeSlotText,
          selectedTime === item && styles.selectedTimeSlotText,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.servicePrice}>${service.price}</Text>
      </View>

      <Text style={styles.sectionTitle}>Select Barber</Text>
      <FlatList
        data={barbers}
        renderItem={renderBarber}
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.barberList}
      />

      <Text style={styles.sectionTitle}>Select Date</Text>
      <FlatList
        data={getNextDays()}
        renderItem={renderDateSlot}
        keyExtractor={item => item.toDateString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateList}
      />

      <Text style={styles.sectionTitle}>Select Time</Text>
      <FlatList
        data={timeSlots}
        renderItem={renderTimeSlot}
        keyExtractor={item => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.timeSlotList}
      />

      <TouchableOpacity
        style={styles.bookButton}
        onPress={handleBooking}
        disabled={booking}>
        {booking ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.bookButtonText}>Book Appointment</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  serviceName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  servicePrice: {
    fontSize: 18,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  barberList: {
    paddingBottom: 15,
  },
  barberCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    width: 150,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedBarberCard: {
    borderColor: '#007AFF',
  },
  barberName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  barberSpecialization: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  barberExperience: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  barberRating: {
    fontSize: 14,
    color: '#FFD700',
  },
  dateList: {
    paddingBottom: 15,
  },
  dateSlot: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    minWidth: 70,
  },
  selectedDateSlot: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  monthText: {
    fontSize: 12,
    color: '#666',
  },
  selectedDateText: {
    color: '#fff',
  },
  timeSlotList: {
    paddingBottom: 20,
  },
  timeSlot: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginRight: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTimeSlot: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  timeSlotText: {
    fontSize: 16,
    color: '#333',
  },
  selectedTimeSlotText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bookButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookAppointmentScreen;
