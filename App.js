import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import moment2 from 'moment-timezone';
import ntpClient from 'react-native-ntp-client';

const App = () => {
  const [bangladeshTime, setBangladeshTime] = useState('');

  const fetchBangladeshTime = () => {
    ntpClient.getNetworkTime('pool.ntp.org', 123, (error, date) => {
      if (error) {
        console.error(error);
        return;
      }

      // Use moment-timezone to convert UTC time to Bangladesh time
      const bdTime = moment2(date).tz('Asia/Dhaka').format('hh:mm:ss A'); // Format in 12-hour format with AM/PM

      setBangladeshTime(bdTime);
    });
  };

  useEffect(() => {
    // Fetch the time initially
    fetchBangladeshTime();

    // Update the time every minute
    const interval = setInterval(() => {
      fetchBangladeshTime();
    }, 1000); // 60,000 ms = 1 minute

    // Cleanup the interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 40,
          fontWeight: '900',
          backgroundColor: 'gray',
          width: '100%',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {bangladeshTime}
      </Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
