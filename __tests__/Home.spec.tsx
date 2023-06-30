import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Home from '../Screens/Home';
import axios from 'axios';
import { Alert } from 'react-native';


jest.mock('axios');

describe('Home component', () => {
  test('handles button press - success', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(<Home navigation={navigation} />);
    const countryInput = getByPlaceholderText('Enter the Country');
    const button = getByTestId('buttontest');

    fireEvent.changeText(countryInput, 'Canada');
    const countryData = [{ name: { common: 'Canada' } }];
    axios.get.mockResolvedValueOnce({ data: countryData });
    fireEvent.press(button);

    
    await waitFor(() => expect(navigation.navigate).toHaveBeenCalledWith('CountryDetails', { data: countryData }));

    expect(queryByTestId('error-alert')).toBeNull();
  });

  test('handles button press - failure', async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByPlaceholderText, getByTestId, queryByTestId } = render(<Home navigation={navigation} />);

    const countryInput = getByPlaceholderText('Enter the Country');
    const button = getByTestId('buttontest');

    fireEvent.changeText(countryInput, 'InvalidCountry');

    // Mock the axios.get function to return a rejected promise
    axios.get.mockRejectedValueOnce({ response: { data: { message: 'API error' } } });

    // Spy on the Alert.alert function
    const alertSpy = jest.spyOn(Alert, 'alert');

    // Simulate button press
    fireEvent.press(button);

    // Wait for the axios request to reject and handle the error
    await waitFor(() => expect(alertSpy).toHaveBeenCalledWith('Failed', 'API error',[{"text": "OK"}], {"cancelable": true}));

  });
});
