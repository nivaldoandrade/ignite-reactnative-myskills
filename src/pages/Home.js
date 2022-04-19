import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  FlatList
} from 'react-native';
import { Button } from '../Components/Button';
import { SkillCard } from '../Components/SkillCard';

export function Home() {
  const [newSkill, setNewSkill] = useState();
  const [mySkills, setMySkills] = useState([]);

  function handleAddNewSkill() {
    setMySkills((state) => [...state, newSkill]);
    setNewSkill('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Nivaldo</Text>
      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        value={newSkill}
        onChangeText={setNewSkill}
      />

      <Button handleAddNewSkill={handleAddNewSkill} />

      <Text style={[styles.title, { marginTop: 50, paddingBottom: 16 }]}>
        MySkills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <SkillCard skill={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1E25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  }
});
