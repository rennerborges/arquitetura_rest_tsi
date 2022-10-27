/* eslint-disable max-len */
import moment from 'moment';
import mongoose from 'mongoose';
import ObjectModel from '../models/object';
import { removeValueUndefinedOrNull } from '../util/object';

export const getObject = async (req, res, next) => {
  /* #swagger.tags = ["Objetos"] */
  /* #swagger.description = "Rota responsável por trazer um objeto específico pelo id do mesmo" */
  /* #swagger.parameters['objectId'] = {
      in: "path",
      description: "Identificação do objeto",
      required: true,
      type: "string",
  } */
  const { objectId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(objectId)) {
      throw new Error('Informe um id válido');
    }

    const object = await ObjectModel.findById(objectId);

    if (!object || !object.enabled) {
      return res.status(404).json({ message: 'Object not found' });
    }

    res.json({ object });
  } catch (error) {
    next(error);
  }
};

export const getObjects = async (req, res) => {
  /* #swagger.tags = ["Objetos"] */
  /* #swagger.description = "Rota responsável por trazer todos os objetos" */
  const objects = await ObjectModel.find();

  res.json({
    objects,
  });
};

export const createObject = async (req, res, next) => {
  /* #swagger.tags = ["Objetos"] */
  /* #swagger.description = "Rota responsável por criar um objeto" */
  /* #swagger.requestBody = { 
    required: true, 
    content: { 
      "application/json": { 
        schema: { $ref: "#/components/schemas/PostObject" }, 
      } 
    } 
    } 
  */
  const { body } = req;

  try {
    const object = new ObjectModel({
      name: body.name,
      data: body.data,
      model: body.model,
      createdAt: moment(),
      createdBy: req.user.email,
      enabled: true,
    });

    await object.save();

    res.status(201).json({ object });
  } catch (error) {
    next(error);
  }
};

export const updateObject = async (req, res, next) => {
  /* #swagger.tags = ["Objetos"] */
  /* #swagger.description = "Rota responsável por atualizar um objeto utilizando seu id" */
  /* #swagger.parameters['objectId'] = {
      in: "path",
      description: "Identificação do objeto",
      required: true,
      type: "string",
  } */
  /* #swagger.requestBody = { 
    required: true, 
    content: { 
      "application/json": { 
        schema: { $ref: "#/components/schemas/EditObject" }, 
      } 
    } 
    } 
  */
  const { body } = req;
  const { objectId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(objectId)) {
      throw new Error('Informe um id válido');
    }

    const bodyUpdate = removeValueUndefinedOrNull({
      name: body.name,
      data: body.data,
      model: body.model,
      updatedAt: moment(),
      updatedBy: req.user.email,
      enabled: true,
    });

    const object = await ObjectModel.findOneAndUpdate(
      { _id: objectId },
      bodyUpdate,
    );

    if (!object) {
      return res.status(404).json({ message: 'Objeto não encontrado' });
    }

    res.send();
  } catch (error) {
    next(error);
  }
};

export const deleteObject = async (req, res, next) => {
  /* #swagger.tags = ["Objetos"] */
  /* #swagger.description = "Rota responsável por desativar um objeto utilizando seu ID" */
  /* #swagger.parameters['objectId'] = {
      in: "path",
      description: "Identificação do objeto",
      required: true,
      type: "string",
  } */
  const { objectId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(objectId)) {
      throw new Error('Informe um id válido');
    }

    const bodyUpdate = {
      enabled: false,
      updatedAt: moment(),
      updatedBy: req.user.email,
    };

    const user = await ObjectModel.findOneAndUpdate(
      { _id: objectId },
      bodyUpdate,
    );

    if (!user) {
      return res.status(404).json({ message: 'Objeto não encontrado' });
    }

    res.send();
  } catch (error) {
    next(error);
  }
};

export default {
  getObject,
  getObjects,
  createObject,
  updateObject,
  deleteObject,
};
