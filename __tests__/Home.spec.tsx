import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import Home from '../Screens/Home';
import { Alert } from 'react-native';
jest.mock('axios', () => ({
    get: jest.fn(),
  }));
  describe('Home component', () => {
    it('should navigate to CountryDetails screen with data on button press', async () => {
      const mockNavigation = {
        navigate: jest.fn(),
      };
  
      const mockedData = {  };
      axios.get.mockResolvedValueOnce({ data: mockedData });
  
      const { getByPlaceholderText, getByText } = render(
        <Home navigation={mockNavigation} />
      );
  
      const input = getByPlaceholderText('Enter the Country');
      fireEvent.changeText(input, 'Country Name');
  
      const button = getByText('Get Weather');
      fireEvent.press(button);
  
      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
          'https://restcountries.com/v3.1/name/Country Name'
        );
        expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
        expect(mockNavigation.navigate).toHaveBeenCalledWith('CountryDetails', {
          data: mockedData,
        });
      });
    });

    it('alert should be shown button press if something went wrong in calling api', async () => {
      const mockNavigation = {
        navigate: jest.fn(),
      };
      
      const  Alert = {
          alert: jest.fn(),
        }
     
      
      
      const mockedData = {  };
      axios.get.mockResolvedValueOnce({ data: mockedData });
  
      const { getByPlaceholderText, getByText } = render(
        <Home navigation={mockNavigation} />
      );
  
      const input = getByPlaceholderText('Enter the Country');
      fireEvent.changeText(input, '1111');
  
      const button = getByText('Get Weather');
      fireEvent.press(button);
  
     
        expect(axios.get).toHaveBeenCalledTimes(2);
        expect(axios.get).toHaveBeenCalledWith(
          'https://restcountries.com/v3.1/name/1111'
        );
        expect(mockNavigation.navigate).not.toHaveBeenCalled();
      
      });
 
  });
  