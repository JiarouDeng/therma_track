import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {useState, useEffect} from 'react';
import {BarChart, LineChart} from 'react-native-chart-kit';
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
      {data.length > 0 && (
        <LineChart
          style={styles.graph}
          data={{
            labels: data.map(
              (item: {time_logged: Date; temp_data: number}, index: number) =>
                index % 5 === 0 ? item.time_logged.toLocaleDateString() : '',
            ),
            datasets: [
              {
                data: data.map(
                  (item: {time_logged: Date; temp_data: number}) =>
                    item.temp_data,
                ),
              },
            ],
          }}
          width={Dimensions.get('window').width - 40} // chart width
          height={300}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#f7f7f7',
            backgroundGradientTo: '#fff',
            decimalPlaces: 1,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#ff7300',
            },
          }}
        />
      )}
      <Text> minimum temperature: {min_temp}</Text>
      <Text> maximum temperature: {max_temp}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  graph: {
    alignItems: 'center',
  },
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
