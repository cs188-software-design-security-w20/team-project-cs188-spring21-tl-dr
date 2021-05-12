class Service {
  static rejectResponse(error, code = 500) {
    return { error, code };
  }

  static successResponse(payload, code = 200, cookie=null) {
    return { payload, code, cookie };
  }
}

module.exports = Service;
