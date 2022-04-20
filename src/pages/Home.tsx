import React, { useState, useEffect } from 'react';
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

interface MySkills {
  id: string;
  skill: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<MySkills[]>([]);
  const [gretting, setGretting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGretting('Good morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setGretting('Good afternoon');
    } else {
      setGretting('Good evening');
    }
  }, []);

  function handleAddNewSkill() {
    if (newSkill === '') {
      return;
    }

    const data = {
      id: String(new Date().getTime()),
      skill: newSkill
    };
    setMySkills((state) => [...state, data]);
    setNewSkill('');
  }

  function handleRemoveSkill(id: string) {
    const skillfilter = mySkills.filter((skill) => skill.id !== id);

    setMySkills(skillfilter);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{gretting}, Nivaldo</Text>
      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        value={newSkill}
        onChangeText={setNewSkill}
      />

      <Button title="add" onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginTop: 50, paddingBottom: 16 }]}>
        MySkills
      </Text>

      <FlatList
        data={mySkills}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <SkillCard
            skill={item.skill}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
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
