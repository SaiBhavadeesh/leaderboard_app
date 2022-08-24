import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {DataTable, Provider} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {studentData} from './StudentData';

studentData.sort((a, b) => a.test + a.score - (b.test + b.score)).reverse();
const recordLength = [10, 25, 50, 100, 250];

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [page, setPage] = useState(0);
  const [records, setRecords] = useState(10);
  useEffect(() => {
    setPage(0);
  }, [records]);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>First Name</DataTable.Title>
            <DataTable.Title>Last Name</DataTable.Title>
            <DataTable.Title numeric>Academic Test</DataTable.Title>
            <DataTable.Title numeric>Sports Score</DataTable.Title>
            <DataTable.Title numeric>Total</DataTable.Title>
          </DataTable.Header>
          <ScrollView style={styles.scrollHeight}>
            {studentData
              .slice(page * records, page * records + records)
              .map(row => (
                <DataTable.Row key={row.id}>
                  <DataTable.Cell>{row.first_name}</DataTable.Cell>
                  <DataTable.Cell>{row.last_name}</DataTable.Cell>
                  <DataTable.Cell numeric>{row.test}</DataTable.Cell>
                  <DataTable.Cell numeric>{row.score}</DataTable.Cell>
                  <DataTable.Cell numeric>
                    {row.test + row.score}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            <DataTable.Pagination
              optionsPerPage={recordLength}
              itemsPerPage={records}
              setItemsPerPage={setRecords}
              page={page}
              numberOfPages={Math.ceil(studentData.length / records)}
              onPageChange={setPage}
              label={`${page * records + 1}-${page * records + records} of ${
                studentData.length
              }`}
              showFastPaginationControls
              numberOfItemsPerPageList={recordLength}
              numberOfItemsPerPage={records}
              onItemsPerPageChange={setRecords}
              selectPageDropdownLabel={'Rows per page'}
            />
          </ScrollView>
        </DataTable>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  scrollHeight: {height: '92%'},
});

export default App;
