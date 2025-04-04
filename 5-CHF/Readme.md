# Initializing Go project

```
go mod init kbaauto

```

# Get the contract api

```
go get github.com/hyperledger/fabric-contract-api-go@v1.2.1

```

# Get all required dependancies and remove any unnecessary

```
go mod tidy

```

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





