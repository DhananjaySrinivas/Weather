import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import CountryDetails from '../Screens/CountryDetails'; 
jest.mock('axios', () => ({
    get: jest.fn(),
  }));
  describe('CountryDetails component', () => {
    it('should navigate to WeatherDetails screen with data on button press', async () => {
      const mockNavigation = {
        navigate: jest.fn(),
      };
  
      const mockedData = { };
      axios.get.mockResolvedValueOnce({ data: mockedData });
  
      const route = {
        params: {
          data: [],
        },
      };
  
      const { getByText } = render(
        <CountryDetails route={route} navigation={mockNavigation} />
      );
  
      const button = getByText(" undefined's Weather");

      fireEvent.press(button);
      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
          'http://api.weatherstack.com/current?access_key=d9ad6e94a8f815a2c855d69119fbc2cd&query=undefined'
        );
        expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockNavigation.navigate).toHaveBeenCalledWith('WeatherDetails', {
          data: mockedData,
        });
      });
    });
  });
    