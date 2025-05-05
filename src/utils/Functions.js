/**
 * Generates a unique id based on the clientId
 *
 * @param {string} clientId The block clientId
 * @return {string} The uniqueId
 *
 * Credit: Forked from GenerateBlocks.
 */
export const generateUniqueId = ( clientId ) => clientId.substring( 2, 9 ).replace( '-', '' );
