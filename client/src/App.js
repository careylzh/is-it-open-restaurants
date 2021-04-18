import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SearchPage from './Components/SearchPage'

//TODO: add component CollectionsPage into body of 2nd tab panel when does 
function App() {
  return (
    <div className="App">
    
    <Tabs>
    <TabList>
      <Tab>Search</Tab>
      <Tab>Favourites</Tab>
    </TabList>

    <TabPanel>
      <SearchPage />
    </TabPanel>
    <TabPanel>
      <h2>Lists of Favourites</h2>
    </TabPanel>
    </Tabs>
      
    </div>
  );
}

export default App;
