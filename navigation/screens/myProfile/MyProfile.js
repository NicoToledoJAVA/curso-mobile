import { StyleSheet, View, Image, Text } from 'react-native'
import SubmitButton from '../../../components/SubmitButton'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import { useGetUserQuery } from '../../../services/user'
const MyProfile = () => {

    const navigation = useNavigation()
    const localId = useSelector(state => state.user.localId)
    const { data: user, isLoading } = useGetUserQuery({ localId })


    if (isLoading) return <View><Text>Cargando</Text></View>

    return (
        <View style={styles.container}>

            {user?.image ? (
                <View style={styles.containerImage}>
                    <Image
                        source={{ uri: user.image }}
                        resizeMode="cover"
                        style={styles.image}
                    />
                </View>
            ) : (
                <>
                    <MaterialCommunityIcons name="pirate" size={200} color="black" />

                    <Text style={styles.caption}>
                        El pirata se muestra por defecto.
                    </Text>
                </>

            )}
            <SubmitButton title="Agregar imagen de perfil" onPress={() => navigation.navigate("ImageSelector")} />
            
           
        </View>
    )
}

export default MyProfile

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
        alignItems: "center",
        gap: 20
    },
    caption: {
        fontSize: 18,
        textAlign: "center"
    },

    containerImage: {
        width: 150,
        height: 150,
        borderRadius: "50%",
        overflow: "hidden"
    },

    image: {
        width: 150,
        height: 150
    }
})