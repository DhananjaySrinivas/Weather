import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Weather from '../Screens/Weather';

describe('Weather component', () => {
  test('renders weather details correctly', () => {
    const weather = {
      current: {
        temperature: 25,
        weather_icons: ['https://example.com/image.png'],
        wind_speed: 10,
        precip: 0.1
      },
    };
    const route = {
      params: {
        data: weather,
      },
    };
 const navigation = {
      navigate: jest.fn(),
    };

    const { getByText, getByTestId } = render(
      <Weather route={route} navigation={navigation} />
    );
    const temperatureText = getByText('temperature : 25 C');
    expect(temperatureText).toBeTruthy();
    const weatherImage = getByTestId('weather-image');
    expect(weatherImage.props.source.uri).toBe('https://example.com/image.png');
    const windSpeedText = getByText('WindSpeed : 10 KM/hr');
    expect(windSpeedText).toBeTruthy(); 
    const precipitationText = getByText('precipitation : 0.1');
    expect(precipitationText).toBeTruthy();
    const closeButton = getByText('Close');
    fireEvent.press(closeButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Home');
  });
});
