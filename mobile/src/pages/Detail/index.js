import React from 'react';

import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';

import logoImg from '../../assets/logo.png';

import styles from './styles.js';

import * as MailComposer from 'expo-mail-composer';

function Detail(){

    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;

    function navigateBack(){
        navigation.goBack();
    }

    const message = `Òlá, ${incident.name}. 
        Gostaria de ajudar no caso "${incident.title}" 
        com o valor de ${Intl.NumberFormat('pt-BR', 
        { style: 'currency', currency: 'BRL' })
        .format(incident.value)}`
    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso ${incident.title}`,
            recipients: [incident.email], // destinatário
            body: message,
        })
    }
    
    function sendWhatsApp(){
        //Linking.openURL(`whatsapp://send?phone=+5591983659681&text=${message}`);
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }
        
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather  name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                 <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>Valor:</Text>
                
                <Text style={styles.incidentValue}>{
                Intl.NumberFormat('pt-BR', 
                { style: 'currency', currency: 'BRL' })
                .format(incident.value)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity onPress={sendWhatsApp} style={styles.action}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={sendMail} style={styles.action}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default Detail;