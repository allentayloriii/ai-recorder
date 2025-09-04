import { useClerk } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { cssInterop } from "nativewind";
import { TouchableOpacity } from "react-native";

cssInterop(Ionicons, {
  className: {
    target: "style",
    nativeStyleToProp: { color: true },
  },
});

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      Linking.openURL(Linking.createURL("/"));
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <TouchableOpacity onPress={handleSignOut} className="p-2">
      <Ionicons name="log-out" size={24} className="color-blue-500" />
    </TouchableOpacity>
  );
};
