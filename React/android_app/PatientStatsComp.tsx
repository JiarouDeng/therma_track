import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import {API_BASE_URL} from './config_constants';

interface Props {
  patient_id: number;
}

function PatientStatsComp({patient_id}: Props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/temperature/${patient_id}`);
        const json_data: [string, number][] = await res.json();

        const formatted_data = json_data
          .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
          .map(entry => ({
            time_logged: new Date(entry[0]),
            temp_data: entry[1],
          }));

        console.log(formatted_data);
        setData(formatted_data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [patient_id]);

  const temp_datas = data.map(
    (entry: {time_logged: Date; temp_data: number}) => entry.temp_data,
  );

  // Ensure there is valid data
  const min_temp: number = temp_datas.length ? Math.min(...temp_datas) - 1 : 30;
  const max_temp: number = temp_datas.length ? Math.max(...temp_datas) + 1 : 45;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {data.length === 0
          ? `No data stored currently. Waiting for more data on patient ${patient_id}`
          : 'Patient Temperature Over Time'}
      </Text>
      {data.map((entry: {time_logged: Date; temp_data: number}, index) => (
        <Text key={index}>
          {entry.time_logged.toLocaleString()}: {entry.temp_data}
        </Text>
      ))}
      <Text> minimum temperature: {min_temp}</Text>
      <Text> maximum temperature: {max_temp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PatientStatsComp;
