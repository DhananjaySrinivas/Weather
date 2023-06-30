import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import CountryDetails from '../Screens/CountryDetails';
import axios from 'axios';

// Mock the axios.get function
jest.mock('axios');

describe('CountryDetails component', () => {
  const dummyData = [
    {
      name: { common: 'Dummy Country' },
      capital: ['Dummy Capital'],
      population: '1000000',
      latlng: [0, 0],
      flags: { png: 'dummy-flag.png' },
    },
  ];

  test('renders country details correctly', async () => {
    const { getByText, getByTestId } = render(<CountryDetails route={{ params: { data: dummyData } }} />);

    const countryName = getByText('Dummy Country');
    const capital = getByText('Capital : Dummy Capital');
    const population = getByText('population : 1000000');
    const latitude = getByText('latitude : 0 & Longitude : 0');
    const countryImage = getByTestId('country-image');

    expect(countryName).toBeTruthy();
    expect(capital).toBeTruthy();
    expect(population).toBeTruthy();
    expect(latitude).toBeTruthy();
    expect(countryImage).toBeTruthy();
  });

  test('handles weather button press - success', async () => {
    // Mock the axios.get function to return a resolved promise with weather data
    const weatherData = { temperature: 25, weather_descriptions: ['Sunny'] };
    axios.get.mockResolvedValueOnce({ data: weatherData });

    const navigation = {
      navigate: jest.fn(),
    };

    const { getByTestId, queryByText } = render(
      <CountryDetails route={{ params: { data: dummyData } }} navigation={navigation} />
    );

    const weatherButton = getByTestId('weather-button');

    fireEvent.press(weatherButton);

    // Assert that the weather button shows the loading indicator
    await waitFor(() => expect(queryByText("Dummy Capital's Weather")).toBeTruthy());

    // Wait for the axios request to resolve and navigate to WeatherDetails
    await waitFor(() => expect(navigation.navigate).toHaveBeenCalledWith('WeatherDetails', { data: weatherData }));
  });

  test('handles weather button press - failure', async () => {
    // Mock the axios.get function to return a rejected promise
    axios.get.mockRejectedValueOnce({ response: { data: { message: 'API error' } } });

    const alertSpy = jest.spyOn(Alert, 'alert');

    const navigation = {
      navigate: jest.fn(),
    };

    const { getByTestId } = render(
      <CountryDetails route={{ params: { data: dummyData } }} navigation={navigation} />
    );

    const weatherButton = getByTestId('weather-button');

    fireEvent.press(weatherButton);

    // Wait for the axios request to reject and handle the error
    await waitFor(() => expect(alertSpy).toHaveBeenCalledWith("Failed", "API error", [{"text": "OK"}], {"cancelable": true}));
  });
});
