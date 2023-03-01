import { EventDomainEntityBase } from '../entities';
import {
  DateTimeEndValueObject,
  DateTimeInitValueObject,
  LengthValueObject,
  PageValueObject,
} from '../value-objects';

/**
 * Interfaz de servicio para la entidad `EventEntity`
 *
 * Esta interfaz define las operaciones que se pueden realizar en
 * una entidad `EventEntity`, como agregar un registro o consultar
 * el historial de registros.
 *
 * @export
 * @interface IEventDomainService
 * @template E - Tipo de la entidad `EventEntity` que debe de extender
 *   de EventDomainEntityBase
 */
export interface IEventDomainService {
  /**
   * Obtiene el historial de los registros del sistema
   *
   * @param {PageValueObject} [page] - Número de página para la paginación
   *   de resultados
   * @param {LengthValueObject} [length] - Cantidad de registros a devolver
   *   por página
   * @param {DateTimeInitValueObject} [dateTimeInit] - Fecha y hora inicial
   *   del rango de fechas a consultar
   * @param {DateTimeEndValueObject} [dateTimeEnd] - Fecha y hora final
   *   del rango de fechas a consultar
   * @return {(Promise<Array<E> | null>)} - Una promesa que devuelve un arreglo
   *   de registros de la entidad `EventEntity`, o null si no
   *   se encontraron registros
   * @memberof IEventDomainService
   */
  getHistory(
    page?: PageValueObject,
    length?: LengthValueObject,
    dateTimeInit?: DateTimeInitValueObject,
    dateTimeEnd?: DateTimeEndValueObject,
  ): Promise<Array<EventDomainEntityBase> | null>;

  /**
   * Agrega un nuevo registro
   *
   * @param {E} log - Datos del registro en un objeto de tipo `EventEntity`
   * @return {(Promise<E | null>)} - Una promesa que devuelve la entidad
   *   `EventEntity` cuando esta es creada o null si el registro no pudo
   *   ser agregado
   * @memberof IEventDomainService
   */
  addLog(log: EventDomainEntityBase): Promise<EventDomainEntityBase | null>;
}
