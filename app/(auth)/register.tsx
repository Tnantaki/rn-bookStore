import { Link } from "expo-router";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSession } from "../../contexts/SessionContext";
import { useState } from "react";
import Button from "../../components/button";

interface Account {
  email: string;
  password: string;
}

export default function Register() {
  const { register } = useSession();
  const [account, setAccount] = useState<Account>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true)
    try {
      await register(account.email, account.password);

    } catch (error) {
      console.log('got error', error)
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-3xl font-semibold text-purple-600">
          Register Account
        </Text>
        <View className="flex-0 bg-red w-8/12 m-4 gap-3">
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            className="border-2 border-purple-700 px-4 py-2 rounded-lg text-lg"
            onChangeText={(text) => setAccount({ ...account, email: text })}
            value={account.email}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="border-2 border-purple-700 px-4 py-2 rounded-lg text-lg"
            onChangeText={(text) => setAccount({ ...account, password: text })}
            value={account.password}
          />
          {error && <Text className="mb-2 text-red-600">{error}</Text>}
        </View>
        <Button
          title={loading ? "Loading..." : "Sign Up"}
          onPress={handleSubmit}
          className="bg-purple-600 text-white py-4 px-6 rounded-lg text-xl mb-4"
        />
        <Link href={"/sign-in"} className="border-b-2">
          Back to sign in
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
}
