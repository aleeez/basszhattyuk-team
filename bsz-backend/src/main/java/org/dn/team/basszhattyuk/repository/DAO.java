package org.dn.team.basszhattyuk.repository;

import java.util.Collection;
import java.util.Optional;

public interface DAO<T> {
    T save(T entity);

    void deleteById(Long id);

    Optional<T> findById(Long id);

    Collection<T> findAll();
}
