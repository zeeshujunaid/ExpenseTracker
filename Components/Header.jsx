import { View, Text } from "react-native";

export default function Header(){
    return(
        <View style={{padding:20, backgroundColor:'#EF4444', alignItems:'center'}}>
            <Text style={{color:'#fff', fontSize:20, fontWeight:'bold'}}>Expense Tracker</Text>
        </View>
    );
}