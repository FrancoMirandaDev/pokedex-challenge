import { Router } from "express";
import {
  getPokemon,
  getPokemonTypes,
  getPokemonName,
} from "../controllers/pokemon.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 * name: Pokemon
 * description: API para obtener pokemons
 
  * /pokemon:

 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene una lista de pokemons
 *     description: Este endpoint devuelve una lista de pokemons. Puedes paginar los resultados utilizando los parámetros de consulta `offset` y `limit`.
 *     tags: [Pokemon]
 *     parameters:
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: El número de items a saltar antes de empezar a devolver pokemons.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: El número máximo de pokemons a devolver.
 *     responses:
 *       200:
 *         description: Una lista de pokemons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                       image:
 *                         type: string
 *                       name:
 *                         type: string
 *                       types:
 *                         type: array
 *                         items:
 *                           type: string
 *                       stats:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             name:
 *                               type: string
 *                             value:
 *                               type: integer
 *       400:
 *         description: Los parámetros `offset` y `limit` deben ser números válidos
 *       500:
 *         description: Error al obtener datos de la API de Pokemon
 */
router.get("/", getPokemon);

/**
 * @swagger
 * /type/{type}:
 *  get:
 *   summary: Obtiene pokemons de un tipo específico
 *   description: Este endpoint devuelve una lista de pokemons de un tipo específico.
 *   tags: [Pokemon]
 *   parameters:
 *    - in: path
 *      name: type
 *      schema:
 *        type: string
 *      required: true
 *      description: El tipo de pokemon
 *   responses:
 *    200:
 *     description: La lista de pokemons del tipo especificado
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         count:
 *          type: integer
 *         results:
 *          type: array
 *          items:
 *           type: object
 *           properties:
 *            name:
 *             type: string
 *            url:
 *             type: string
 *    404:
 *     description: Tipo no encontrado
 *    500:
 *     description: Error al obtener datos de la API de Pokemon
 */
router.get("/type/:type", getPokemonTypes);

/**
 * @swagger
 * /search:
 *  get:
 *   summary: Busca un pokemon por nombre
 *   description: Este endpoint devuelve los detalles de un pokemon por nombre.
 *   tags: [Pokemon]
 *   parameters:
 *    - in: query
 *      name: name
 *      schema:
 *        type: string
 *      description: El nombre del pokemon
 *      required: true
 *    - in: query
 *      name: limit
 *      schema:
 *        type: integer
 *      description: El número máximo de pokemons a devolver.
 *      required: false
 *    - in: query
 *      name: offset
 *      schema:
 *        type: integer
 *      description: El número de items a saltar antes de empezar a devolver pokemons.
 *      required: false
 *
 *   responses:
 *    200:
 *     description: Los detalles del pokemon
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         url:
 *          type: string
 *         image:
 *          type: string
 *         name:
 *          type: string
 *         types:
 *          type: array
 *          items:
 *           type: string
 *         stats:
 *          type: array
 *          items:
 *           type: object
 *           properties:
 *            name:
 *             type: string
 *            value:
 *             type: integer
 *    404:
 *     description: Pokemon no encontrado
 *    500:
 *     description: Error al obtener datos de la API de Pokemon
 */
router.get("/search", getPokemonName);

export default router;
