import AsyncStorage from '@react-native-async-storage/async-storage';

// Funções genéricas reaproveitadas por todos os módulos de storage.
// O AsyncStorage só guarda texto, então convertemos de/para JSON aqui.
// Qualquer falha de leitura/escrita é engolida: o app continua funcionando, só não persiste.

export async function salvarJson<T>(chave: string, valor: T): Promise<void> {
  try {
    await AsyncStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // ignora: persistência é "melhor esforço"
  }
}

export async function lerJson<T>(chave: string, padrao: T): Promise<T> {
  try {
    const texto = await AsyncStorage.getItem(chave);
    return texto === null ? padrao : (JSON.parse(texto) as T);
  } catch {
    return padrao;
  }
}

export async function remover(chave: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(chave);
  } catch {
    // ignora
  }
}
