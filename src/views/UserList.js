import React, { useContext } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import { Avatar, Button, ListItem, Icon } from "react-native-elements";
import UsersContext from './../context/UsersContext';

export default props => {
    
    const {state, dispatch} = useContext(UsersContext)

    function confirmUserDeletion(user){
        Alert.alert('Excluir Usuário', 'Deseja Excluir o usuário?',[
            {
                text:'Sim', 
                onPress(){
                    dispatch({
                        type: 'deleteUser',
                        payload: user,
                    })
                }
            },
            {
                text:'Não'
            }
        ])
    }

    function getActions(user){
        return (
            <View style={{
                flex:1,
                flexDirection:'row', 
                justifyContent:'center', 
                alignItems:'center'}}>
                <Button
                    onPress={() => props.navigation.navigate('UserForm', user)}
                    type="clear"
                    icon={<Icon name="edit" size={25} color="orange"/>}
                />
                <Button
                    onPress={() => confirmUserDeletion(user)}
                    type="clear"
                    icon={<Icon name="delete" size={25} color="red"/>}
                />
            </View>
        )
    }

    function getUserItem({ item: user }) {
        return (
            <ListItem.Swipeable bottomDivider
                onPress={()=>props.navigation.navigate('UserForm',user)}
                rightContent={getActions(user)}   
                >
                <Avatar source={{uri: user.avatarUrl}}/>
                <ListItem.Content>
                <ListItem.Title>{user.name}</ListItem.Title>
                <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
                
            
            </ListItem.Swipeable>
        )
    }


    return (
        <View>
            <FlatList 
                keyExtractor={user => user.id.toString()}
                data={state.users}
                renderItem={getUserItem}
            />
        </View>
    )
}