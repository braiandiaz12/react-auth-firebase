import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  inputWithIcon: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'

  },
  button: {

    backgroundColor: '#f57c00',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  bgPowderBlue: {
    backgroundColor: 'powderblue',
  },
  bgMistyRose: {
    backgroundColor: 'mistyrose'
  },
  bgBurlywood: {
    backgroundColor: 'burlywood'
  },
  bgRebeccaPurple: {
    backgroundColor: 'rebeccapurple'
  },

  textLight: {
    color: 'snow'
  },

  buttonText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 18
  },

  error: {
    color: 'red',
    alignSelf: 'center'
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24,
    paddingTop: 40,
  }
});
