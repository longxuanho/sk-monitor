export const timeConfig = {
  defaultDateFormat: 'YYYY-MM-DD',
  defaultDateHourFormat: 'YYYY-MM-DD HH:mm',
  defaultDateTimeFormat: 'YYYY-MM-DD HH:mm:ss',
}

export const dbHelper = {
  gSheet: {
    
  }
}

export const dbConfigProd = {
  firebase: {
    apiKey: "AIzaSyDtcsdw-isDU4bqrx_ZpD6lt4TrTYGfEDA",
    authDomain: "sk-monitor-163609.firebaseapp.com",
    databaseURL: "https://sk-monitor-163609.firebaseio.com",
    projectId: "sk-monitor-163609",
    storageBucket: "sk-monitor-163609.appspot.com",
    messagingSenderId: "434836734187"
  },
  fbRefUsers: "prod/accounts/users",
  fbRefStsProductivityLogs: "prod/logs/stsOperations"
}

export const dbConfigDev = {
  fbRefUsers: 'dev/accounts/users',
  fbRefStsProductivityLogs: "dev/logs/stsOperations"
}