
# Start network using script file

```
./startNetwork.sh

```

# Minifab commands to deploy and invoke chaincode

```
sudo chmod -R 777 vars/
```
```
mkdir -p vars/chaincode/KBA-Automobile/go
```
```
cp -r ../Chaincode/* vars/chaincode/KBA-Automobile/go/
```
```
minifab ccup -n KBA-Automobile -l go -v 1.0 -d false -r false
```
```
minifab invoke -n KBA-Automobile -p '"CreateCar","car01","BMW","320d","Red","F-01","01/01/2024"'
```
```
minifab query -n KBA-Automobile -p '"ReadCar","car01"'

```

# Add DeleteCar function to car-contract

// DeleteCar removes the instance of Car from the world state
func (c *CarContract) DeleteCar(ctx contractapi.TransactionContextInterface, carID string) (string, error) {

	clientOrgID, err := ctx.GetClientIdentity().GetMSPID()
	if err != nil {
		return "", err
	}
	if clientOrgID == "manufacturer-auto-com" {

		exists, err := c.CarExists(ctx, carID)
		if err != nil {
			return "", fmt.Errorf("%s", err)
		} else if !exists {
			return "", fmt.Errorf("the car, %s does not exist", carID)
		}

		err = ctx.GetStub().DelState(carID)
		if err != nil {
			return "", err
		} else {
			return fmt.Sprintf("car with id %v is deleted from the world state.", carID), nil
		}

	} else {
		return "", fmt.Errorf("user under following MSPID: %v can't perform this action", clientOrgID)
	}
}



**Update the chaincode**
```
cp -r ../Chaincode/* vars/chaincode/KBA-Automobile/go/
```

```
minifab ccup -n KBA-Automobile -l go -v 1.1 -d false -r false
```

```
minifab invoke -n KBA-Automobile -p '"DeleteCar","car01"'
```
```
minifab query -n KBA-Automobile -p '"ReadCar","car01"'

```


**Checking access control**
```
minifab invoke -n KBA-Automobile -p '"CreateCar","car02","BMW","320d","Red","F-01","01/01/2024"' -o dealer.auto.com 
```
```
minifab invoke -n KBA-Automobile -p '"CreateCar","car02","BMW","320d","Red","F-01","01/01/2024"' -o manufacturer.auto.com 
```
```
minifab query -n KBA-Automobile -p '"ReadCar","car02"'

```

**To view explorer**
```
minifab explorerup
```
userid: `exploreradmin`

password: `exploreradminpw`
```
minifab explorerdown
```
**To view couchdb**

http://localhost:7006/_utils/

userid: `admin`

password: `adminpw`


**To view the details of a block**
```
minifab blockquery
```
```
minifab blockquery -b 6
```
**To view blockchain**
```
docker exec -it peer1.mvd.auto.com /bin/sh
```
```
ls var/hyperledger/production/ledgersData/chains/chains/autochannel/
```
```
cat var/hyperledger/production/ledgersData/chains/chains/autochannel/blockfile_000000
```
```
exit
```

**To stop network and restart it later**

```
minifab down
```
```
minifab restart
```

**To cleanup entire network**
```
minifab cleanup
```
```
sudo rm -rf vars
```


