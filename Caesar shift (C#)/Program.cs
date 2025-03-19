using System.Runtime.Loader;

namespace caesar_shift
{
    class Program
    {
        static char[] alphabet = { 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        static void Main(string[] args)
        {
            Console.Write("Enter phrase: ");
            string tempPhrase = Console.ReadLine();
            string phrase = tempPhrase.ToUpper();
            Console.WriteLine("");

            for (int key = 1; key <= 26; key++)
            {
                string decryptedPhrase = DecryptPhrase(phrase, key);
                Console.WriteLine($"Key: {key} => Decrypted phrase: {decryptedPhrase}");
                Console.WriteLine("");
            }
        }

        static string DecryptPhrase(string phrase, int initialKey)
        {
            char[] phraseChars = phrase.ToCharArray(); // Phrase in ein Array von Zeichen umwandeln
            int phraseLength = phrase.Length; // Länge der Phrase speichern
            int alphabetLength = alphabet.Length; // Länge des Alphabets speichern

            char[] decryptedPhrase = new char[phraseLength]; // Array für die entschlüsselte Phrase vorbereiten
            int currentKey = initialKey; // Den aktuellen Schlüssel setzen

            for (int i = 0; i < phraseLength; i++) // Schleife über alle Zeichen der Phrase
            {
                char currentChar = phraseChars[i]; // Das aktuelle Zeichen holen

                if (char.IsLetter(currentChar)) // Überprüfen, ob das Zeichen ein Buchstabe ist
                {
                    int indexInAlphabet = Array.IndexOf(alphabet, currentChar); // Position des aktuellen Zeichens im Alphabet finden
                    int shiftedIndex = (indexInAlphabet - currentKey + alphabetLength) % alphabetLength; // Den neuen Index nach Verschiebung berechnen

                    decryptedPhrase[i] = alphabet[shiftedIndex]; // Das entschlüsselte Zeichen speichern

                    currentKey++; // Den Schlüssel für den nächsten Buchstaben erhöhen (falls es über 26 geht)
                    if (currentKey > 26)
                    {
                        currentKey = currentKey % 26;
                    }
                }
                
                else // Nicht-Buchstaben direkt übernehmen
                {
                    decryptedPhrase[i] = currentChar;
                }
            }

            return new string(decryptedPhrase); // Die entschlüsselte Phrase zurückgeben
        }
    }
}
