import pymysql

# This tricks Django into thinking pymysql is a newer version of mysqlclient
pymysql.version_info = (2, 2, 7, "final", 0)
pymysql.install_as_MySQLdb()