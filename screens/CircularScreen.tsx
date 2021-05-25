import { Layout, Text, List, Divider } from '@ui-kitten/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import CircularCard from '../components/CircularCard';
import { CircularCardProps } from '../types';
interface circularScreenProps {}

const CircularScreen = () => {
  const circularData: Array<CircularCardProps> = [
    {
      heading: 'Accouncement for open Internships',
      content: 'We are glad to announce that ...',
      public: true,
    },
    {
      heading: 'Accouncement for open Internships',
      content: 'We are glad to announce that ...',
      public: true,
    },
    {
      heading: 'Accouncement for open Internships',
      content: 'We are glad to announce that ...',
      public: true,
    },
    {
      heading: 'Accouncement for open Internships',
      content: 'We are glad to announce that ...',
      public: true,
    },
  ];
  return (
    <Layout>
      <List
        data={circularData}
        renderItem={CircularCard}
        ItemSeparatorComponent={Divider}
      />
    </Layout>
  );
};

export default CircularScreen;

const styles = StyleSheet.create({});
