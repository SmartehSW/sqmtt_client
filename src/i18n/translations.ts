import type { SupportedLocale } from "./locales";

export type AppMessages = {
    common: {
        ok: string;
        back: string;
        unknownError: string;
        language: string;
        pwaReloadConfirm: string;
    };
    app: {
        configLoadError: string;
        errorLoadingTitle: string;
        mqttConnectFailed: string;
    };
    connectionInfo: {
        userName: string;
        protocol: string;
        hostName: string;
        port: string;
        path: string;
        mqttProtocol: string;
        clientId: string;
        disconnect: string;
    };
    mqttStatus: Record<
        | "Disconnected"
        | "Connecting"
        | "Closed"
        | "Offline"
        | "Connected"
        | "Error"
        | "Reconnecting"
        | "Disconnecting",
        string
    >;
    connectForm: {
        mqttTab: string;
        dashboardTab: string;
        stylesTab: string;
        connect: string;
        headerSmartehMqtt: string;
        headerDashboardConnection: string;
        url: string;
        user: string;
        password: string;
        clientId: string;
        keepAlive: string;
        protocolVersion: string;
        cleanSession: string;
        connectionTimeout: string;
        reconnectPeriod: string;
        lastWill: string;
        topic: string;
        payload: string;
        qos: string;
        retain: string;
        valUrlRequired: string;
        valKeepAlive: string;
        valProtocolVersion: string;
        valConnectTimeout: string;
        valReconnect: string;
        valWillTopic: string;
        valWillQos: string;
        valWillRetain: string;
        valDashboardUpload: string;
        connectionValuesErrorTitle: string;
        connectionValuesErrorMsg: string;
        connectionStorageErrorTitle: string;
        connectionStorageErrorMsg: string;
    };
    upload: {
        nameLabel: string;
    };
};

const en: AppMessages = {
    common: {
        ok: "OK",
        back: "Back",
        unknownError: "Unknown error.",
        language: "Language",
        pwaReloadConfirm: "New content available. Reload?",
    },
    app: {
        configLoadError: "Cannot load the application configuration",
        errorLoadingTitle: "Error loading SmartehMqtt",
        mqttConnectFailed: "Failed to connect to MQTT broker",
    },
    connectionInfo: {
        userName: "User name:",
        protocol: "Protocol:",
        hostName: "Host name:",
        port: "Port:",
        path: "Path:",
        mqttProtocol: "MQTT protocol:",
        clientId: "Client Id:",
        disconnect: "Disconnect",
    },
    mqttStatus: {
        Disconnected: "Disconnected",
        Connecting: "Connecting",
        Closed: "Closed",
        Offline: "Offline",
        Connected: "Connected",
        Error: "Error",
        Reconnecting: "Reconnecting",
        Disconnecting: "Disconnecting",
    },
    connectForm: {
        mqttTab: "MQTT Connection",
        dashboardTab: "Dashboard",
        stylesTab: "Styles",
        connect: "Connect",
        headerSmartehMqtt: "Smarteh MQTT",
        headerDashboardConnection: "Dashboard connection",
        url: "URL",
        user: "User",
        password: "Password",
        clientId: "Client ID",
        keepAlive: "Keep alive",
        protocolVersion: "Protocol version",
        cleanSession: "Clean session",
        connectionTimeout: "Connection timeout",
        reconnectPeriod: "Reconnect period",
        lastWill: "Last will message",
        topic: "Topic",
        payload: "Payload",
        qos: "QoS",
        retain: "Retain",
        valUrlRequired: "Please input the url of the MQTT broker.",
        valKeepAlive: "Please define a Keep alive value.",
        valProtocolVersion: "Please define a Protocol version.",
        valConnectTimeout: "Please define a Connection timeout value.",
        valReconnect: "Please define a Reconnect period value.",
        valWillTopic:
            "Please input the url of the topic for the last will message.",
        valWillQos: "Please input the QoS for the last will message.",
        valWillRetain:
            "Please input the retain value for the last will message.",
        valDashboardUpload: "Please upload a dashboard definition file.",
        connectionValuesErrorTitle: "Connection values error",
        connectionValuesErrorMsg:
            "Please fix the values with validation messages",
        connectionStorageErrorTitle: "Connection error",
        connectionStorageErrorMsg:
            "Connection values cannot be stored locally. Please review the application permissions.",
    },
    upload: {
        nameLabel: "Name:",
    },
};

const si: AppMessages = {
    ...en,
    common: {
        ok: "V redu",
        back: "Nazaj",
        unknownError: "Neznana napaka.",
        language: "Jezik",
        pwaReloadConfirm: "Na voljo je nova vsebina. Osvežim stran?",
    },
    app: {
        configLoadError: "Konfiguracije aplikacije ni mogoče naložiti",
        errorLoadingTitle: "Napaka pri nalaganju SmartehMqtt",
        mqttConnectFailed: "Povezava z MQTT brokerjem ni uspela",
    },
    connectionInfo: {
        userName: "Uporabniško ime:",
        protocol: "Protokol:",
        hostName: "Gostitelj:",
        port: "Vrata:",
        path: "Pot:",
        mqttProtocol: "MQTT protokol:",
        clientId: "ID odjemalca:",
        disconnect: "Prekini povezavo",
    },
    mqttStatus: {
        Disconnected: "Brez povezave",
        Connecting: "Vezava …",
        Closed: "Zaprto",
        Offline: "Brez povezave",
        Connected: "Povezano",
        Error: "Napaka",
        Reconnecting: "Ponovna vzpostavitev …",
        Disconnecting: "Prekinjanje …",
    },
    connectForm: {
        mqttTab: "MQTT povezava",
        dashboardTab: "Nadzorna plošča",
        stylesTab: "Slogi",
        connect: "Poveži",
        headerSmartehMqtt: "Smarteh MQTT",
        headerDashboardConnection: "Povezava nadzorne plošče",
        url: "URL",
        user: "Uporabnik",
        password: "Geslo",
        clientId: "ID odjemalca",
        keepAlive: "Keep alive",
        protocolVersion: "Različica protokola",
        cleanSession: "Čista seja",
        connectionTimeout: "Časovna omejitev povezave",
        reconnectPeriod: "Interval ponovne povezave",
        lastWill: "Zadnja volja (sporočilo)",
        topic: "Tema",
        payload: "Tovor",
        qos: "QoS",
        retain: "Obdrži",
        valUrlRequired: "Vnesite URL MQTT brokerja.",
        valKeepAlive: "Določite vrednost keep alive.",
        valProtocolVersion: "Določite različico protokola.",
        valConnectTimeout: "Določite časovno omejitev povezave.",
        valReconnect: "Določite interval ponovne povezave.",
        valWillTopic: "Vnesite temo za sporočilo zadnje volje.",
        valWillQos: "Vnesite QoS za sporočilo zadnje volje.",
        valWillRetain: "Določite retain za sporočilo zadnje volje.",
        valDashboardUpload: "Naložite datoteko z definicijo nadzorne plošče.",
        connectionValuesErrorTitle: "Napaka v vrednostih povezave",
        connectionValuesErrorMsg: "Popravite vrednosti glede na sporočila validacije",
        connectionStorageErrorTitle: "Napaka pri povezavi",
        connectionStorageErrorMsg:
            "Vrednosti ni mogoče shraniti lokalno. Preverite dovoljenja aplikacije.",
    },
    upload: {
        nameLabel: "Ime:",
    },
};

const it: AppMessages = {
    ...en,
    common: {
        ok: "OK",
        back: "Indietro",
        unknownError: "Errore sconosciuto.",
        language: "Lingua",
        pwaReloadConfirm: "Nuovo contenuto disponibile. Ricaricare?",
    },
    app: {
        configLoadError: "Impossibile caricare la configurazione dell'applicazione",
        errorLoadingTitle: "Errore durante il caricamento di SmartehMqtt",
        mqttConnectFailed: "Connessione al broker MQTT non riuscita",
    },
    connectionInfo: {
        userName: "Nome utente:",
        protocol: "Protocollo:",
        hostName: "Host:",
        port: "Porta:",
        path: "Percorso:",
        mqttProtocol: "Protocollo MQTT:",
        clientId: "ID client:",
        disconnect: "Disconnetti",
    },
    mqttStatus: {
        Disconnected: "Disconnesso",
        Connecting: "Connessione in corso",
        Closed: "Chiuso",
        Offline: "Offline",
        Connected: "Connesso",
        Error: "Errore",
        Reconnecting: "Riconnessione",
        Disconnecting: "Disconnessione",
    },
    connectForm: {
        mqttTab: "Connessione MQTT",
        dashboardTab: "Dashboard",
        stylesTab: "Stili",
        connect: "Connetti",
        headerSmartehMqtt: "Smarteh MQTT",
        headerDashboardConnection: "Connessione dashboard",
        url: "URL",
        user: "Utente",
        password: "Password",
        clientId: "ID client",
        keepAlive: "Keep alive",
        protocolVersion: "Versione protocollo",
        cleanSession: "Sessione pulita",
        connectionTimeout: "Timeout connessione",
        reconnectPeriod: "Periodo riconnessione",
        lastWill: "Testamento (last will)",
        topic: "Topic",
        payload: "Payload",
        qos: "QoS",
        retain: "Retain",
        valUrlRequired: "Inserire l'URL del broker MQTT.",
        valKeepAlive: "Definire un valore keep alive.",
        valProtocolVersion: "Definire la versione del protocollo.",
        valConnectTimeout: "Definire il timeout di connessione.",
        valReconnect: "Definire il periodo di riconnessione.",
        valWillTopic: "Inserire il topic per il messaggio last will.",
        valWillQos: "Inserire il QoS per il messaggio last will.",
        valWillRetain: "Impostare retain per il messaggio last will.",
        valDashboardUpload: "Caricare un file di definizione della dashboard.",
        connectionValuesErrorTitle: "Errore nei valori di connessione",
        connectionValuesErrorMsg:
            "Correggere i valori in base ai messaggi di validazione",
        connectionStorageErrorTitle: "Errore di connessione",
        connectionStorageErrorMsg:
            "Impossibile salvare i valori in locale. Verificare i permessi dell'applicazione.",
    },
    upload: {
        nameLabel: "Nome:",
    },
};

const fr: AppMessages = {
    ...en,
    common: {
        ok: "OK",
        back: "Retour",
        unknownError: "Erreur inconnue.",
        language: "Langue",
        pwaReloadConfirm: "Nouveau contenu disponible. Recharger ?",
    },
    app: {
        configLoadError: "Impossible de charger la configuration de l'application",
        errorLoadingTitle: "Erreur de chargement de SmartehMqtt",
        mqttConnectFailed: "Échec de la connexion au courtier MQTT",
    },
    connectionInfo: {
        userName: "Nom d'utilisateur :",
        protocol: "Protocole :",
        hostName: "Hôte :",
        port: "Port :",
        path: "Chemin :",
        mqttProtocol: "Protocole MQTT :",
        clientId: "ID client :",
        disconnect: "Déconnecter",
    },
    mqttStatus: {
        Disconnected: "Déconnecté",
        Connecting: "Connexion",
        Closed: "Fermé",
        Offline: "Hors ligne",
        Connected: "Connecté",
        Error: "Erreur",
        Reconnecting: "Reconnexion",
        Disconnecting: "Déconnexion",
    },
    connectForm: {
        mqttTab: "Connexion MQTT",
        dashboardTab: "Tableau de bord",
        stylesTab: "Styles",
        connect: "Connecter",
        headerSmartehMqtt: "Smarteh MQTT",
        headerDashboardConnection: "Connexion au tableau de bord",
        url: "URL",
        user: "Utilisateur",
        password: "Mot de passe",
        clientId: "ID client",
        keepAlive: "Keep alive",
        protocolVersion: "Version du protocole",
        cleanSession: "Session propre",
        connectionTimeout: "Délai de connexion",
        reconnectPeriod: "Période de reconnexion",
        lastWill: "Dernière volonté (message)",
        topic: "Sujet",
        payload: "Charge utile",
        qos: "QoS",
        retain: "Conserver",
        valUrlRequired: "Saisir l'URL du courtier MQTT.",
        valKeepAlive: "Définir une valeur keep alive.",
        valProtocolVersion: "Définir la version du protocole.",
        valConnectTimeout: "Définir le délai de connexion.",
        valReconnect: "Définir la période de reconnexion.",
        valWillTopic: "Saisir le sujet du message de dernière volonté.",
        valWillQos: "Saisir le QoS du message de dernière volonté.",
        valWillRetain: "Définir retain pour le message de dernière volonté.",
        valDashboardUpload:
            "Téléverser un fichier de définition du tableau de bord.",
        connectionValuesErrorTitle: "Erreur de valeurs de connexion",
        connectionValuesErrorMsg:
            "Corrigez les valeurs selon les messages de validation",
        connectionStorageErrorTitle: "Erreur de connexion",
        connectionStorageErrorMsg:
            "Impossible d'enregistrer les valeurs localement. Vérifiez les permissions de l'application.",
    },
    upload: {
        nameLabel: "Nom :",
    },
};

const de: AppMessages = {
    ...en,
    common: {
        ok: "OK",
        back: "Zurück",
        unknownError: "Unbekannter Fehler.",
        language: "Sprache",
        pwaReloadConfirm: "Neuer Inhalt verfügbar. Neu laden?",
    },
    app: {
        configLoadError: "Anwendungskonfiguration kann nicht geladen werden",
        errorLoadingTitle: "Fehler beim Laden von SmartehMqtt",
        mqttConnectFailed: "Verbindung zum MQTT-Broker fehlgeschlagen",
    },
    connectionInfo: {
        userName: "Benutzername:",
        protocol: "Protokoll:",
        hostName: "Hostname:",
        port: "Port:",
        path: "Pfad:",
        mqttProtocol: "MQTT-Protokoll:",
        clientId: "Client-ID:",
        disconnect: "Trennen",
    },
    mqttStatus: {
        Disconnected: "Getrennt",
        Connecting: "Verbindung wird hergestellt",
        Closed: "Geschlossen",
        Offline: "Offline",
        Connected: "Verbunden",
        Error: "Fehler",
        Reconnecting: "Wiederverbindung",
        Disconnecting: "Verbindung wird getrennt",
    },
    connectForm: {
        mqttTab: "MQTT-Verbindung",
        dashboardTab: "Dashboard",
        stylesTab: "Stile",
        connect: "Verbinden",
        headerSmartehMqtt: "Smarteh MQTT",
        headerDashboardConnection: "Dashboard-Verbindung",
        url: "URL",
        user: "Benutzer",
        password: "Passwort",
        clientId: "Client-ID",
        keepAlive: "Keep alive",
        protocolVersion: "Protokollversion",
        cleanSession: "Saubere Sitzung",
        connectionTimeout: "Verbindungs-Timeout",
        reconnectPeriod: "Wiederverbindungsintervall",
        lastWill: "Letzter Wille (Nachricht)",
        topic: "Thema",
        payload: "Nutzdaten",
        qos: "QoS",
        retain: "Retain",
        valUrlRequired: "Bitte die URL des MQTT-Brokers eingeben.",
        valKeepAlive: "Bitte einen Keep-Alive-Wert angeben.",
        valProtocolVersion: "Bitte die Protokollversion angeben.",
        valConnectTimeout: "Bitte das Verbindungs-Timeout angeben.",
        valReconnect: "Bitte das Wiederverbindungsintervall angeben.",
        valWillTopic: "Bitte das Thema für die Last-Will-Nachricht eingeben.",
        valWillQos: "Bitte den QoS für die Last-Will-Nachricht eingeben.",
        valWillRetain: "Bitte Retain für die Last-Will-Nachricht angeben.",
        valDashboardUpload:
            "Bitte eine Dashboard-Definitionsdatei hochladen.",
        connectionValuesErrorTitle: "Fehler bei Verbindungswerten",
        connectionValuesErrorMsg:
            "Bitte die Werte anhand der Validierungsmeldungen korrigieren",
        connectionStorageErrorTitle: "Verbindungsfehler",
        connectionStorageErrorMsg:
            "Werte können nicht lokal gespeichert werden. Bitte Anwendungsberechtigungen prüfen.",
    },
    upload: {
        nameLabel: "Name:",
    },
};

const catalog: Record<SupportedLocale, AppMessages> = {
    en,
    si,
    it,
    fr,
    de,
};

export function getMessages(locale: SupportedLocale): AppMessages {
    return catalog[locale] ?? en;
}
