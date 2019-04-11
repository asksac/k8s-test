#!/bin/sh

# this script deletes all k8s resources created by deploy.sh script

echo 'Deleting time-service, time-service-pod and time-deployment resources...'

kubectl delete services -l app=time-service
kubectl delete pods -l app=time-service
kubectl delete deployments -l app=time-service

echo 'Deleted time-service, time-service-pod and time-deployment resources!'
