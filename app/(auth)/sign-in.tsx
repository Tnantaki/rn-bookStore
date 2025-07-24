import { Link, router } from "expo-router";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Account, useSession } from "../../contexts/SessionContext";
import { useState } from "react";
import Button from "../../components/button";

export default function SignIn() {
  const { signIn } = useSession();
  const [account, setAccount] = useState<Account>({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    try {
      await signIn(account.email, account.password);

      // Navigate after signing in. You may want to tweak this to ensure sign-in is
      // successful before navigating.
      router.replace("/profile");
    } catch (error) {
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
        <Text className="text-3xl font-semibold text-blue-600">
          Sign In Account
        </Text>
        <View className="flex-0 bg-red w-8/12 m-4 gap-3">
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            className="border-2 border-blue-700 px-4 py-2 rounded-lg text-lg"
            onChangeText={(text) => setAccount({ ...account, email: text })}
            value={account.email}
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            className="border-2 border-blue-700 px-4 py-2 rounded-lg text-lg"
            onChangeText={(text) => setAccount({ ...account, password: text })}
            value={account.password}
          />
          {error && <Text className="mb-2 text-red-600">{error}</Text>}
        </View>
        <Button
          title={loading ? "Loading..." : "Sign In"}
          onPress={handleSubmit}
          className="bg-blue-600 text-white py-4 px-6 rounded-lg text-xl mb-4"
        />
        <Link href={"/register"} className="border-b-2">
          Register
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
}
