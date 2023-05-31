import { type Request, type Response } from 'express';
import UsefullyPhonesDAO from '../dao/UsefullyPhonesDAO';
import { NotFoundException } from '../utils/errors/Exceptions';

class UsefullyPhonesController {
  public async getPhones (req: Request, res: Response): Promise<Response | undefined | null> {
    try {
      const dao = new UsefullyPhonesDAO();
      const usefullyPhonesList = await dao.getPhones();

      if (!usefullyPhonesList) throw new NotFoundException('Nenhum Telefone encontrado !');

      if (!usefullyPhonesList.length) throw new NotFoundException('Nenhum Telefone encontrado');

      return res.send(usefullyPhonesList);
    } catch (err) {
      if (err instanceof NotFoundException) {
        return res.status(err.statusCode).send(err.getErrorResponse());
      } else {
        return res.status(500).send(err.getErrorResponse());
      }
    }
  }
}

export default new UsefullyPhonesController();
