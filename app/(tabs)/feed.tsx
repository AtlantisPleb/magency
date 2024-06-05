import React from 'react';
import { Screen } from '@/components/Screen';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useStore } from '@/lib/store'; // Update with your actual store import path

export default function FeedScreen() {
  // const events = useStore((state) => state.events);

  // Usage example
  const events = useStore((state) => state.getEventsInReverseChronologicalOrder());
  // console.log("Events in reverse chronological order:", sortedEvents);


  // Function to format JSON string
  const formatJson = (jsonString) => {
    try {
      const jsonObject = JSON.parse(jsonString);
      return JSON.stringify(jsonObject, null, 2);
    } catch (error) {
      return jsonString;
    }
  };

  return (

    <ScrollView contentContainerStyle={feedstyles.container}>
      {events.length === 0 ? (
        <Text>No events available.</Text>
      ) : (
        events.map((event, index) => (
          <View key={index} style={feedstyles.eventContainer}>
            <Text style={feedstyles.eventId}>
              {formatJson(event.content)}
            </Text>
          </View>
        ))
      )}
    </ScrollView>

  );
}

export const feedstyles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 80
  },
  eventContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  eventId: {
    fontSize: 16,
    color: '#fefefe',
    fontFamily: 'Courier',
  },
});
