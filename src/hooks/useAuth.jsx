import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [dbUser, setDbUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    setTimeout(() => {
      if (initializing) setInitializing(false);
    }, 1000);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    let listener = () => {};
    if (user) {
      const {uid, email} = user;
      const userRef = firestore().collection('Users').doc(uid);

      const fetchAndCreateUser = async () => {
        try {
          const fetchedUser = await userRef.get();
          if (!fetchedUser.exists) {
            await userRef.set({
              email,
              isActive: false,
              name: '',
              createdAt: Date.now(),
              updatedAt: Date.now(),
            });
            console.log('User added!');
          }
        } catch (error) {
          console.error(
            'An error occurred while fetching or creating the user:',
            error,
          );
        }
      };

      fetchAndCreateUser();
      listener = userRef.onSnapshot(documentSnapshot => {
        if (documentSnapshot.data()) {
          setDbUser({id: uid, ...documentSnapshot.data()});
        }
      });
    }
    return listener;
  }, [user]);

  return (
    <AuthContext.Provider value={{initializing, user, dbUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};

// Custom hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// import React, { useState, useEffect } from 'react';
// import { View, Text } from 'react-native';
// import auth from '@react-native-firebase/auth';

// function App() {
//   // Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (initializing) return null;

//   if (!user) {
//     return (
//       <View>
//         <Text>Login</Text>
//       </View>
//     );
//   }

//   return (
//     <View>
//       <Text>Welcome {user.email}</Text>
//     </View>
//   );
// }

// ----------------------------Sample Use -----------------------------------------

// import { useAuth } from './path-to-this-file'; // Update this path accordingly

// const MyComponent = () => {
//   const { auth, setAuth } = useAuth();

//   const handleLogin = async () => {
//     try {
//       // Dummy data: Replace this with actual data from a login API call or user input
//       const newAuthData = {
//         phone: '123-456-7890',
//         token: 'sample-token-123456',
//       };

//       await setAuth(newAuthData);
//       console.log("Logged in successfully!");
//     } catch (error) {
//       console.error("Error logging in:", error);
//     }
//   };

//   return (
//     < >
//         <Text>Current Phone: {auth.phone}</Text>
//         {/* Note: Displaying a token in the UI is usually not recommended due to security concerns */}
//         <Text>Current Token: {auth.token}</Text>
//       <Button title="Login with Dummy Data" onPress={handleLogin} />
//     </>
//   );
// };

// export default MyComponent;

// Entities:
// Truck

// TruckID (Primary Key)
// LicensePlate
// Model
// Capacity
// Status
// CreatedAt
// UpdatedAt
// CreatedBy (Foreign Key from User)
// Trip

// TripID (Primary Key)
// TruckID (Foreign Key from Truck)
// CustomerID (Foreign Key from Customer)
// Source
// Destination
// Date
// EstimatedDuration
// ActualDuration
// Status
// CreatedAt
// UpdatedAt
// CreatedBy (Foreign Key from User)
// Customer

// CustomerID (Primary Key)
// Name
// ContactDetails
// Address
// CreatedAt
// UpdatedAt
// CreatedBy (Foreign Key from User)
// Payment

// PaymentID (Primary Key)
// TripID (Foreign Key from Trip)
// Amount
// PaymentStatus
// PaymentType
// Date
// CreatedAt
// UpdatedAt
// CreatedBy (Foreign Key from User)
// User

// UserID (Primary Key)
// Username
// Password
// Role
// CreatedAt
// UpdatedAt
// TripUser

// TripUserID (Primary Key)
// TripID (Foreign Key from Trip)
// UserID (Foreign Key from User)
// ActionType
// ActionDate
// CreatedAt
// UpdatedAt
// Expense

// ExpenseID (Primary Key)
// TripID (Foreign Key from Trip, Nullable)
// Amount
// Date
// Category
// Description
// CreatedAt
// UpdatedAt
// CreatedBy (Foreign Key from User)
// Driver

// DriverID (Primary Key)
// Name
// LicenseNumber
// ContactDetails
// Salary
// CreatedAt
// UpdatedAt
// CreatedBy (Foreign Key from User)
// TripDriver

// TripDriverID (Primary Key)
// TripID (Foreign Key from Trip)
// DriverID (Foreign Key from Driver)
// CreatedAt
// UpdatedAt
// Savings

// SavingsID (Primary Key)
// Amount
// Date
// Source (e.g., PaymentID if from a trip)
// CreatedAt
// UpdatedAt
// CreatedBy (Foreign Key from User)
