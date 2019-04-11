#!/bin/sh

echo 'Creating resources defined in k8s-deployment.yaml...'

kubectl create -f ./k8s-deployment.yaml 

echo 'Deployment and Service created... sleeping for 5s'

sleep 5

kubectl get deployments -l app=time-service
kubectl get pods -l app=time-service
kubectl get services -l app=time-service

# display list of services currently running in minikube 
# minikube service list
