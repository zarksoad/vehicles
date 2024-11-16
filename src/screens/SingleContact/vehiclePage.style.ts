import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleCard: {
    width: 300,
    maxWidth: 500,
    borderRadius: 10,
    backgroundColor: '#f0faff',
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  vehicleImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 16,
  },
  vehicleName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  vehicleInfo: {
    width: 300,
    padding: 10,
    alignItems: 'flex-start',
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#d0e6ef',
    borderRadius: 8,
    backgroundColor: '#f0faff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  vehicleLicensePlate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 8,
    textAlign: 'center',
    backgroundColor: '#e8f4fc',
    padding: 8,
    borderRadius: 8,
    width: '100%',
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  iconButton: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 8,
    padding: 20,
  },
  trashIcon: {
    backgroundColor: '#e57373',
  },
  updateIcon: {
    backgroundColor: '#81c784',
  },
});

export default styles;
