import logo from './logo.svg';
import './App.css';
import React from 'react';
import GetUserLocation from './hooks/getUserLocation';
import GetWeather from './hooks/getWeather';
import { Layout, Image, Typography, Card, Row, Col, Radio } from 'antd';
import 'antd/dist/antd.css';

const { Header, Footer, Sider, Content } = Layout;
const { Text, Link, Title } = Typography;

function App() {
  const userLocation = GetUserLocation();
  const { weather, loading } = GetWeather(userLocation);

  const [distanceUnit, setDistanceUnit] = React.useState('m');
  const [tempUnit, setTempUnit] = React.useState('f');

  return (
    <div className="App">
      <Layout>
        <Header style={{ display: 'flex', flexDirection: 'row', color: 'white', justifyContent: 'space-between' }}>
          <Title style={{ color: 'white' }}>Weather</Title>
        </Header>
        <Content>
          <div>
            {
              loading !== true ?
                <div className='Main-Container'>
                  <div className="Location-Row">
                    <span className="Details-Text">{weather.location.name}</span>
                    <span className="Details-Text">{weather.location.region}</span>
                    <span className="Details-Text">{weather.location.country}</span>
                  </div>
                  <div className="Toggle-Row">
                    <ToggleMilesKilometers distanceUnit={distanceUnit} setDistanceUnit={setDistanceUnit} />
                    <ToggleCelsiusFarenheit tempUnit={tempUnit} setTempUnit={setTempUnit} />
                  </div>
                  <CenterPanel weather={weather} tempUnit={tempUnit} />
                  <Title style={{ textAlign: 'center' }} level={2}>Weather Details</Title>
                  <DetailsPanel weather={weather} distanceUnit={distanceUnit} />
                </div>
                : 'loading'
            }
          </div>
        </Content>
        </Layout>
    </div>
  );
}


const ToggleMilesKilometers = ({ distanceUnit, setDistanceUnit }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Radio.Group value={distanceUnit} onChange={(e) => { setDistanceUnit(e.target.value) }}>
        <Radio.Button value="m">Miles</Radio.Button>
        <Radio.Button value="k">Kilometers</Radio.Button>
      </Radio.Group>
    </div>
  )
}

const ToggleCelsiusFarenheit = ({ tempUnit, setTempUnit }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Radio.Group value={tempUnit} onChange={(e) => { setTempUnit(e.target.value) }}>
        <Radio.Button value="f">Farenheit</Radio.Button>
        <Radio.Button value="c">Celsius</Radio.Button>
      </Radio.Group>
    </div>
  )
}

const CenterPanel = ({ weather, tempUnit }) => {
  const url = weather.current.condition.icon;
  const condition = weather.current.condition.text;

  const temperature = () => {
    if (tempUnit == 'c') {
      return weather.current.temp_c;
    } else {
      return weather.current.temp_f;
    }
  }

  function feelsLike() {
    if (tempUnit == 'c') {
      return weather.current.feelslike_c;
    } else {
      return weather.current.feelslike_f;
    }
  }

  return (
    <div className="Center-Panel-Container">
      <div className="Condition-Frame">
        <img src={url} width={150} />
        <span style={{ fontSize: 48 }}>{condition}</span>
      </div>
      <div className="Temperature-Frame">
        <span style={{ fontSize: 48 }}>{temperature() + '\u00b0' + ' ' + tempUnit}</span>
      </div>
      <div className="Temperature-Frame">
        <span style={{ fontSize: 24 }}>Feels Like {feelsLike() + '\u00b0' + ' ' + tempUnit}</span>
      </div>
    </div>
  )
}

const DetailsPanel = ({ weather, distanceUnit }) => {
  const wind = () => {
    if (distanceUnit == 'k') {
      return weather.current.wind_kph;
    } else {
      return weather.current.wind_mph;
    }
  }

  const wind_gust = () => {
    if (distanceUnit == 'k') {
      return weather.current.gust_kph;
    } else {
      return weather.current.gust_mph;
    }
  }

  const wind_dir = weather.current.wind_dir;

  const wind_degree = weather.current.wind_degree;

  const humidity = weather.current.humidity;

  return (
    <div className="Details-Panel-Container">
      <div className="Details-Panel-Column">
        <span className="Details-Text">Wind: {wind() + distanceUnit}ph {wind_dir} {wind_degree + '\u00b0'}</span>
        <span className="Details-Text">Wind Gust: {wind_gust()} {distanceUnit}ph</span>
      </div>
      <div className="Details-Panel-Column">
        <span className="Details-Text">Humidity: {humidity + '%'}</span>
        <span className="Details-Text">Wind Gust: {wind_gust()} {distanceUnit}ph</span>
      </div>
    </div>
  );
}

export default App;
